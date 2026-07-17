import { Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  city: string;
  quote: string;
  rating: number;
  avatar?: string;
}

export function TestimonialCard({ name, city, quote, rating, avatar }: TestimonialCardProps) {
  return (
    <div className="bg-card border border-border p-8 md:p-12 rounded flex flex-col items-center text-center">
      <div className="flex gap-1 text-accent mb-8">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <blockquote className="font-serif text-2xl leading-relaxed text-foreground mb-8 flex-1">
        "{quote}"
      </blockquote>
      <div className="flex flex-col items-center gap-3">
        {avatar && (
          <img
            src={avatar}
            alt={name}
            className="w-12 h-12 rounded-full object-cover border-2 border-accent/30"
            loading="lazy"
          />
        )}
        <div>
          <p className="font-semibold text-sm tracking-wider uppercase text-foreground">{name}</p>
          <p className="text-xs text-muted-foreground tracking-widest uppercase mt-1">{city}</p>
        </div>
      </div>
    </div>
  );
}
