import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Search, Heart, ShoppingBag, ChevronDown } from 'lucide-react';
import { collections } from '../data/collections';
import { products } from '../data/products';
import { useCart, useWishlist } from '../hooks/use-store';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, navigate] = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);

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
    setIsSearchOpen(false);
    setSearchQuery('');
  }, [location]);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setIsSearchOpen(false); setSearchQuery(''); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const searchResults = searchQuery.trim().length > 1
    ? products.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.artisanName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.region?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

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

          {/* Desktop Nav */}
          <nav className="hidden md:flex flex-1 items-center justify-center gap-7 lg:gap-9 text-[13px] tracking-[0.15em] uppercase font-semibold">
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

              <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[780px] pt-3 transition-all duration-300 origin-top ${
                isCollectionsOpen ? 'opacity-100 scale-y-100 pointer-events-auto' : 'opacity-0 scale-y-0 pointer-events-none'
              }`}>
                <div className="bg-background border border-border shadow-2xl rounded-sm p-5">
                  <div className="grid grid-cols-3 gap-3">
                    {collections.map(c => (
                      <Link
                        key={c.slug}
                        href={`/shop/${c.slug}`}
                        className="group relative block overflow-hidden rounded-sm normal-case"
                        style={{ height: 155 }}
                      >
                        <div
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                          style={{ backgroundImage: `url(${c.heroImage})` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10 transition-opacity duration-300 group-hover:from-black/85 group-hover:via-black/45" />
                        <div className="absolute top-0 left-0 h-[2px] w-0 bg-[#C9973A] transition-all duration-400 group-hover:w-full" />
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <span className="block font-serif text-[13px] text-white leading-tight tracking-wide group-hover:text-[#F0CF8A] transition-colors duration-300">
                            {c.title}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/shop"
                    className="mt-4 text-center block p-2.5 bg-secondary text-foreground hover:bg-[#8B5C2A] hover:text-white rounded-sm transition-colors duration-300 text-[11px] tracking-[0.18em] uppercase font-semibold"
                  >
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
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hover:text-primary transition-colors hidden sm:block"
              aria-label="Search"
            >
              <Search size={19} />
            </button>
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

      {/* ── Search Overlay ── */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-[70] bg-black/60 backdrop-blur-sm flex flex-col items-center pt-28 px-4"
          onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
        >
          <div
            className="w-full max-w-2xl bg-background rounded-sm shadow-2xl overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            {/* Input row */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
              <Search size={18} className="text-muted-foreground shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search artworks, artisans, regions…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
              />
              <button
                onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </div>

            {/* Results */}
            {searchQuery.trim().length > 1 && (
              <div className="max-h-[60vh] overflow-y-auto">
                {searchResults.length === 0 ? (
                  <p className="px-5 py-8 text-center text-muted-foreground text-sm">
                    No pieces found for "{searchQuery}"
                  </p>
                ) : (
                  <ul>
                    {searchResults.map(p => (
                      <li key={p.slug}>
                        <Link
                          href={`/shop/product/${p.slug}`}
                          className="flex items-center gap-4 px-5 py-3 hover:bg-secondary transition-colors"
                        >
                          <img
                            src={p.images[0]}
                            alt={p.title}
                            className="w-12 h-12 object-cover rounded shrink-0 bg-muted"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-serif text-sm truncate">{p.title}</p>
                            <p className="text-xs text-muted-foreground truncate">
                              {p.artisanName} · {p.region}
                            </p>
                          </div>
                          <span className="text-sm font-medium text-primary shrink-0">
                            {p.priceDisplay}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {/* Hint when empty */}
            {searchQuery.trim().length <= 1 && (
              <p className="px-5 py-6 text-center text-xs text-muted-foreground uppercase tracking-widest">
                Type to search our collection
              </p>
            )}
          </div>
        </div>
      )}

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

          {/* Mobile search */}
          <div className="flex items-center gap-2 border border-border rounded-sm px-3 py-2 mb-6">
            <Search size={16} className="text-muted-foreground shrink-0" />
            <input
              type="text"
              placeholder="Search…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
          {searchQuery.trim().length > 1 && (
            <div className="mb-4 border border-border rounded-sm overflow-hidden">
              {searchResults.length === 0 ? (
                <p className="px-4 py-3 text-sm text-muted-foreground">No results found.</p>
              ) : (
                <ul>
                  {searchResults.map(p => (
                    <li key={p.slug}>
                      <Link
                        href={`/shop/product/${p.slug}`}
                        className="flex items-center gap-3 px-4 py-2 hover:bg-secondary transition-colors"
                      >
                        <img src={p.images[0]} alt={p.title} className="w-8 h-8 object-cover rounded shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-serif truncate">{p.title}</p>
                          <p className="text-xs text-muted-foreground">{p.priceDisplay}</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

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
              <Heart size={18} /> Wishlist {wishlistCount > 0 && <span className="bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">{wishlistCount}</span>}
            </Link>
            <Link href="/cart" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ShoppingBag size={18} /> Cart {cartCount > 0 && <span className="bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">{cartCount}</span>}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
