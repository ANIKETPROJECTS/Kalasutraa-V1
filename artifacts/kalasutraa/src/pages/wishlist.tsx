import { useSEO } from '../hooks/use-seo';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { ProductCard } from '../components/ProductCard';
import { useWishlist } from '../hooks/use-store';

export default function Wishlist() {
  const { items } = useWishlist();
  useSEO({ title: 'Your Wishlist' });

  return (
    <Layout>
      <div className="container mx-auto px-6 md:px-12 py-24 min-h-[70vh]">
        <h1 className="font-serif text-4xl mb-12 border-b border-border pb-6">Your Wishlist</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-24 bg-secondary rounded border border-border">
            <h2 className="font-serif text-2xl mb-4">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8">Save the pieces that speak to you.</p>
            <Button href="/shop">Explore Collections</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {items.map((item) => (
              <ProductCard
                key={item.slug}
                slug={item.slug}
                title={item.title}
                priceDisplay={item.priceDisplay}
                images={item.images}
                badge={item.badge}
                soldOut={item.soldOut}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
