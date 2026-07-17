interface ArtisanCardProps {
  name: string;
  title: string;
  award: string;
  region: string;
  bio: string;
  pullQuote: string;
  photo: string;
}

export function ArtisanCard({ name, title, award, region, bio, pullQuote, photo }: ArtisanCardProps) {
  return (
    <div className="bg-card border border-border rounded overflow-hidden flex flex-col h-full hover:shadow-lg transition-shadow duration-500 group">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={`https://picsum.photos/seed/${photo}/600/450`} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0"
          loading="lazy"
        />
        <div className="absolute bottom-4 left-4 flex flex-col gap-2">
          {award && (
            <span className="bg-accent text-white text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm w-max">
              {award}
            </span>
          )}
          <span className="bg-background text-foreground text-[10px] uppercase tracking-widest px-2 py-1 rounded-sm w-max shadow-sm">
            {region}
          </span>
        </div>
      </div>
      <div className="p-8 flex flex-col flex-1">
        <div className="mb-6">
          <h3 className="font-serif text-3xl text-foreground mb-1">{name}</h3>
          <p className="text-sm tracking-widest text-primary uppercase font-semibold">{title}</p>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">
          {bio}
        </p>
        <blockquote className="font-serif italic text-lg text-foreground border-l-2 border-accent pl-4">
          "{pullQuote}"
        </blockquote>
      </div>
    </div>
  );
}
