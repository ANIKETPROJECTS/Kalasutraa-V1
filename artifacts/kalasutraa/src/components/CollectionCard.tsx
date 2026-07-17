import { Link } from 'wouter';

interface CollectionCardProps {
  slug: string;
  title: string;
  description: string;
  heroImage: string;
}

export function CollectionCard({ slug, title, description, heroImage }: CollectionCardProps) {
  return (
    <Link href={`/shop/${slug}`} className="group block h-full">
      <div className="relative overflow-hidden rounded bg-secondary aspect-[4/5] mb-6">
        <img
          src={heroImage}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="text-center px-4">
        <h3 className="font-serif text-2xl mb-2 text-foreground group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </div>
    </Link>
  );
}
