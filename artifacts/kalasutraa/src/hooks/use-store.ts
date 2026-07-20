import { useState, useEffect, useCallback } from 'react';

// ── helpers ──────────────────────────────────────────────────────────────────

function readLS(key: string) {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); }
  catch { return []; }
}

function writeLS(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)); }
  catch { /* quota exceeded, ignore */ }
}

// Emit a custom event so every hook instance on the page stays in sync.
function notify(key: string) {
  window.dispatchEvent(new CustomEvent('kalasutraa-store', { detail: key }));
}

// ── Cart ─────────────────────────────────────────────────────────────────────

const CART_KEY = 'kalasutraa-cart';

export function useCart() {
  const [items, setItems] = useState<any[]>(() => readLS(CART_KEY));

  // Sync when another hook instance writes
  useEffect(() => {
    const handler = (e: Event) => {
      if ((e as CustomEvent).detail === CART_KEY) setItems(readLS(CART_KEY));
    };
    window.addEventListener('kalasutraa-store', handler);
    window.addEventListener('storage', () => setItems(readLS(CART_KEY)));
    return () => {
      window.removeEventListener('kalasutraa-store', handler);
    };
  }, []);

  const addToCart = useCallback((product: any) => {
    setItems(prev => {
      // avoid exact duplicates (same slug)
      const already = prev.find(i => i.slug === product.slug);
      const next = already ? prev : [...prev, product];
      writeLS(CART_KEY, next);
      notify(CART_KEY);
      return next;
    });
  }, []);

  const removeFromCart = useCallback((slug: string) => {
    setItems(prev => {
      const next = prev.filter(i => i.slug !== slug);
      writeLS(CART_KEY, next);
      notify(CART_KEY);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    writeLS(CART_KEY, []);
    notify(CART_KEY);
    setItems([]);
  }, []);

  return { items, addToCart, removeFromCart, clearCart, count: items.length };
}

// ── Wishlist ──────────────────────────────────────────────────────────────────

const WISH_KEY = 'kalasutraa-wishlist';

export function useWishlist() {
  const [items, setItems] = useState<any[]>(() => readLS(WISH_KEY));

  useEffect(() => {
    const handler = (e: Event) => {
      if ((e as CustomEvent).detail === WISH_KEY) setItems(readLS(WISH_KEY));
    };
    window.addEventListener('kalasutraa-store', handler);
    window.addEventListener('storage', () => setItems(readLS(WISH_KEY)));
    return () => {
      window.removeEventListener('kalasutraa-store', handler);
    };
  }, []);

  const toggleWishlist = useCallback((product: any) => {
    setItems(prev => {
      const exists = prev.find(i => i.slug === product.slug);
      const next = exists
        ? prev.filter(i => i.slug !== product.slug)
        : [...prev, product];
      writeLS(WISH_KEY, next);
      notify(WISH_KEY);
      return next;
    });
  }, []);

  const isInWishlist = useCallback(
    (slug: string) => items.some(i => i.slug === slug),
    [items],
  );

  return { items, toggleWishlist, isInWishlist, count: items.length };
}
