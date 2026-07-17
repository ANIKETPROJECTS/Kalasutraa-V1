import { Link } from 'wouter';
import { Button } from './Button';

interface ProductCardProps {
  slug: string;
  title: string;
  priceDisplay: string;
  images: string[];
  badge?: string;
  soldOut?: boolean;
}

export function ProductCard({ slug, title, priceDisplay, images, badge, soldOut }: ProductCardProps) {
  return (
    <Link href={`/shop/product/${slug}`} className="group block">
      <div className="relative overflow-hidden rounded bg-secondary aspect-[3/4] mb-4">
        <img 
          src={`https://picsum.photos/seed/${images[0]}/600/800`} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        
        {badge && (
          <div className="absolute top-4 left-4 bg-background/90 backdrop-blur text-[10px] tracking-widest uppercase font-semibold px-3 py-1.5 rounded-sm">
            {badge}
          </div>
        )}

        {soldOut && (
          <div className="absolute top-4 right-4 bg-espresso/90 text-white text-[10px] tracking-widest uppercase font-semibold px-3 py-1.5 rounded-sm">
            Sold Out
          </div>
        )}

        {/* Quick actions overlay */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Button variant="luxury" className="w-full py-3 text-[10px]" disabled={soldOut}>
            {soldOut ? 'Unavailable' : 'View Details'}
          </Button>
        </div>
      </div>
      <div className="px-1 text-center">
        <h3 className="font-serif text-xl mb-1 text-foreground">{title}</h3>
        <p className="text-sm font-medium tracking-wide text-muted-foreground">{priceDisplay}</p>
      </div>
    </Link>
  );
}
