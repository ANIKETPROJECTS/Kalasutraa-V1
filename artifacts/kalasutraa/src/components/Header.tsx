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
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsCollectionsOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-shadow duration-300 py-5 bg-background/97 backdrop-blur-md ${
          isScrolled ? 'shadow-sm' : ''
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between gap-6">

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-foreground hover:text-primary transition-colors shrink-0"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <div className="flex-none">
            <Link href="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <img
                src="/images/logo.png"
                alt="Kalasutraa"
                className="h-14 md:h-16 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Nav — grows to fill space, centered */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-7 lg:gap-9 text-[13px] tracking-[0.15em] uppercase font-semibold">
            {/* nav link helper — active = primary colour + underline */}
            <Link
              href="/"
              className={`relative whitespace-nowrap transition-colors pb-0.5 ${
                location === '/'
                  ? 'text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-primary after:rounded-full'
                  : 'hover:text-primary'
              }`}
            >Home</Link>

            <div
              className="relative"
              onMouseEnter={() => setIsCollectionsOpen(true)}
              onMouseLeave={() => setIsCollectionsOpen(false)}
            >
              <button
                className={`flex items-center gap-1 transition-colors whitespace-nowrap pb-0.5 relative ${
                  location.startsWith('/shop')
                    ? 'text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-primary after:rounded-full'
                    : 'hover:text-primary'
                }`}
              >
                Collections <ChevronDown size={12} className={`transition-transform duration-300 ${isCollectionsOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[580px] pt-3 transition-all duration-300 origin-top ${
                isCollectionsOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-0 pointer-events-none'
              }`}>
              <div className="bg-background border border-border shadow-xl rounded p-6">
                <div className="grid grid-cols-2 gap-3">
                  {collections.map(c => (
                    <Link
                      key={c.slug}
                      href={`/shop/${c.slug}`}
                      className="block p-3 hover:bg-secondary rounded transition-colors text-left normal-case"
                    >
                      <span className="block font-serif text-base tracking-normal mb-0.5">{c.title}</span>
                      <span className="block text-[11px] text-muted-foreground tracking-normal line-clamp-1">{c.description}</span>
                    </Link>
                  ))}
                </div>
                <Link href="/shop" className="mt-4 text-center block p-2.5 bg-secondary text-foreground hover:bg-accent hover:text-white rounded transition-colors text-[11px] tracking-[0.15em] uppercase font-semibold">
                  View All Collections
                </Link>
              </div>
              </div>
            </div>

            <Link
              href="/our-story"
              className={`relative whitespace-nowrap transition-colors pb-0.5 ${
                location === '/our-story'
                  ? 'text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-primary after:rounded-full'
                  : 'hover:text-primary'
              }`}
            >Our Story</Link>
            <Link
              href="/artisans"
              className={`relative whitespace-nowrap transition-colors pb-0.5 ${
                location === '/artisans'
                  ? 'text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-primary after:rounded-full'
                  : 'hover:text-primary'
              }`}
            >Meet Artisans</Link>
            <Link
              href="/consultation"
              className={`relative whitespace-nowrap transition-colors pb-0.5 ${
                location === '/consultation'
                  ? 'text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-primary after:rounded-full'
                  : 'hover:text-primary'
              }`}
            >Consultation</Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4 shrink-0">
            <Link href="/contact" className="hover:text-primary transition-colors hidden sm:block">
              <Search size={19} />
            </Link>
            <Link href="/wishlist" className="hover:text-primary transition-colors relative">
              <Heart size={19} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full leading-none">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link href="/cart" className="hover:text-primary transition-colors relative">
              <ShoppingBag size={19} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full leading-none">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      <div
        className={`fixed inset-0 bg-black/50 z-[60] transition-opacity md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`absolute top-0 left-0 w-4/5 max-w-sm h-full bg-background p-7 transition-transform duration-500 overflow-y-auto flex flex-col ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-10">
            <img src="/images/logo.png" alt="Kalasutraa" className="h-10 w-auto object-contain" />
            <button onClick={() => setIsMobileMenuOpen(false)} className="text-foreground hover:text-primary transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-5 text-base font-serif">
            <Link href="/" className={`transition-colors border-b pb-3 ${location === '/' ? 'text-primary border-primary font-semibold' : 'border-transparent hover:text-primary'}`}>Home</Link>
            <Link href="/shop" className={`transition-colors border-b pb-3 ${location.startsWith('/shop') ? 'text-primary border-primary font-semibold' : 'border-transparent hover:text-primary'}`}>Shop All Collections</Link>
            <div className="pl-4 flex flex-col gap-3 border-l border-border">
              {collections.map(c => (
                <Link
                  key={c.slug}
                  href={`/shop/${c.slug}`}
                  className={`text-sm transition-colors ${location === `/shop/${c.slug}` ? 'text-primary font-semibold' : 'text-muted-foreground hover:text-primary'}`}
                >
                  {c.title}
                </Link>
              ))}
            </div>
            <Link href="/our-story" className={`transition-colors border-b pb-3 ${location === '/our-story' ? 'text-primary border-primary font-semibold' : 'border-transparent hover:text-primary'}`}>Our Story</Link>
            <Link href="/artisans" className={`transition-colors border-b pb-3 ${location === '/artisans' ? 'text-primary border-primary font-semibold' : 'border-transparent hover:text-primary'}`}>Meet the Artisans</Link>
            <Link href="/consultation" className={`transition-colors border-b pb-3 ${location === '/consultation' ? 'text-primary border-primary font-semibold' : 'border-transparent hover:text-primary'}`}>Book a Consultation</Link>
            <Link href="/contact" className={`transition-colors border-b pb-3 ${location === '/contact' ? 'text-primary border-primary font-semibold' : 'border-transparent hover:text-primary'}`}>Contact Us</Link>
          </div>

          <div className="mt-auto pt-8 flex gap-5 border-t border-border">
            <Link href="/wishlist" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <Heart size={18} /> Wishlist
            </Link>
            <Link href="/cart" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ShoppingBag size={18} /> Cart
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
