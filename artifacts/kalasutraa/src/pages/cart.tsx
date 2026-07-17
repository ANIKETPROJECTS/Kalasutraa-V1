import { useSEO } from '../hooks/use-seo';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { Link } from 'wouter';
import { useCart } from '../hooks/use-store';
import { Trash2 } from 'lucide-react';

export default function Cart() {
  const { items, removeFromCart } = useCart();
  useSEO({ title: 'Your Cart' });

  const total = items.reduce((sum, item) => sum + item.price, 0);
  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(total);

  return (
    <Layout>
      <div className="container mx-auto px-6 md:px-12 py-24 min-h-[70vh]">
        <h1 className="font-serif text-4xl mb-12 border-b border-border pb-6">Your Cart</h1>
        
        {items.length === 0 ? (
          <div className="text-center py-24 bg-secondary rounded border border-border">
            <h2 className="font-serif text-2xl mb-4">Your cart is currently empty</h2>
            <p className="text-muted-foreground mb-8">Discover our collection of heritage art forms.</p>
            <Button href="/shop">Explore Collections</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {items.map((item, index) => (
                <div key={`${item.slug}-${index}`} className="flex gap-6 p-4 border border-border rounded bg-card">
                  <Link href={`/shop/product/${item.slug}`} className="w-24 h-32 shrink-0 bg-secondary rounded overflow-hidden">
                    <img 
                      src={`https://picsum.photos/seed/${item.images[0]}/200/300`} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  </Link>
                  <div className="flex-1 flex flex-col justify-between py-2">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <Link href={`/shop/product/${item.slug}`} className="font-serif text-xl hover:text-primary transition-colors line-clamp-1">
                          {item.title}
                        </Link>
                        <p className="text-sm text-muted-foreground mt-1">By {item.artisanName}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.slug)}
                        className="text-muted-foreground hover:text-destructive transition-colors p-2"
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    <div className="font-medium tracking-wide">
                      {item.priceDisplay}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-card border border-border p-8 rounded h-fit sticky top-32">
              <h2 className="font-serif text-2xl mb-6 border-b border-border pb-4">Order Summary</h2>
              
              <div className="space-y-4 mb-8 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formattedTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-accent italic">Calculated at checkout</span>
                </div>
                <div className="flex justify-between pt-4 border-t border-border font-serif text-xl">
                  <span>Total</span>
                  <span>{formattedTotal}</span>
                </div>
              </div>
              
              <Button className="w-full">Proceed to Checkout</Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
