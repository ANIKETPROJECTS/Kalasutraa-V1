import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Search, Heart, ShoppingBag, ChevronDown } from 'lucide-react';
import { collections } from '../data/collections';
import { useCart, useWishlist } from '../hooks/use-store';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [location] = useLocation();
  
  const { count: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCollectionsOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* Logo */}
        <div className="flex-1 md:flex-none text-center md:text-left">
          <Link href="/" className="font-serif text-2xl tracking-widest text-foreground font-semibold uppercase">
            Kalasutraa
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase font-medium">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          
          <div className="relative group" 
               onMouseEnter={() => setIsCollectionsOpen(true)}
               onMouseLeave={() => setIsCollectionsOpen(false)}>
            <button className="flex items-center gap-1 hover:text-primary transition-colors py-2">
              Collections <ChevronDown size={14} />
            </button>
            
            <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-background border border-border shadow-xl rounded p-6 transition-all duration-300 origin-top ${
              isCollectionsOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
            }`}>
              <div className="grid grid-cols-2 gap-4">
                {collections.map(c => (
                  <Link key={c.slug} href={`/shop/${c.slug}`} className="block p-3 hover:bg-secondary rounded transition-colors text-left">
                    <span className="block font-serif text-lg normal-case mb-1">{c.title}</span>
                    <span className="block text-xs text-muted-foreground normal-case line-clamp-1">{c.description}</span>
                  </Link>
                ))}
                <Link href="/shop" className="col-span-2 mt-4 text-center block p-3 bg-secondary text-foreground hover:bg-accent hover:text-white rounded transition-colors">
                  View All Collections
                </Link>
              </div>
            </div>
          </div>
          
          <Link href="/our-story" className="hover:text-primary transition-colors">Our Story</Link>
          <Link href="/artisans" className="hover:text-primary transition-colors">Meet Artisans</Link>
          <Link href="/consultation" className="hover:text-primary transition-colors">Consultation</Link>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4 text-foreground">
          <Link href="/contact" className="hover:text-primary transition-colors hidden sm:block">
            <Search size={20} />
          </Link>
          <Link href="/wishlist" className="hover:text-primary transition-colors relative">
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link href="/cart" className="hover:text-primary transition-colors relative">
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed inset-0 bg-black/50 z-50 transition-opacity md:hidden ${
        isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`} onClick={() => setIsMobileMenuOpen(false)}>
        <div 
          className={`absolute top-0 left-0 w-4/5 max-w-sm h-full bg-background p-6 transition-transform duration-500 overflow-y-auto ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-10">
            <span className="font-serif text-xl tracking-widest uppercase">Kalasutraa</span>
            <button onClick={() => setIsMobileMenuOpen(false)}><X size={24} /></button>
          </div>
          
          <div className="flex flex-col gap-6 text-lg font-serif">
            <Link href="/">Home</Link>
            <Link href="/shop">Shop All Collections</Link>
            {collections.map(c => (
              <Link key={c.slug} href={`/shop/${c.slug}`} className="text-muted-foreground text-base ml-4">
                {c.title}
              </Link>
            ))}
            <Link href="/our-story">Our Story</Link>
            <Link href="/artisans">Meet the Artisans</Link>
            <Link href="/consultation">Book Consultation</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
        </div>
      </div>
    </header>
  );
}
