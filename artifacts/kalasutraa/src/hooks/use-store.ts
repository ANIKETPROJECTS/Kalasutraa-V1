import { useState, useEffect } from 'react';

export function useCart() {
  const [items, setItems] = useState<any[]>([]);

  // Simple stub for now
  const addToCart = (product: any) => {
    setItems((prev) => [...prev, product]);
  };

  const removeFromCart = (slug: string) => {
    setItems((prev) => prev.filter((item) => item.slug !== slug));
  };

  return { items, addToCart, removeFromCart, count: items.length };
}

export function useWishlist() {
  const [items, setItems] = useState<any[]>([]);

  const toggleWishlist = (product: any) => {
    setItems((prev) => {
      const exists = prev.find((i) => i.slug === product.slug);
      if (exists) {
        return prev.filter((i) => i.slug !== product.slug);
      }
      return [...prev, product];
    });
  };

  const isInWishlist = (slug: string) => {
    return items.some((i) => i.slug === slug);
  };

  return { items, toggleWishlist, isInWishlist, count: items.length };
}
