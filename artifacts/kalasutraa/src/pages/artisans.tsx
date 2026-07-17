import { useSEO } from '../hooks/use-seo';
import { Layout } from '../components/Layout';
import { ArtisanCard } from '../components/ArtisanCard';
import { ScrollReveal } from '../components/ScrollReveal';
import { Button } from '../components/Button';
import { artisans } from '../data/artisans';

export default function Artisans() {
  useSEO({ title: 'Meet the Artisans', description: 'The master hands behind Kalasutraa.' });

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-espresso text-white py-32 border-b-4 border-accent">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <span className="block text-xs font-semibold tracking-widest uppercase text-accent mb-6">The Masters</span>
          <h1 className="font-serif text-5xl md:text-7xl mb-6">Hands that Craft</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Every piece in our gallery is the result of years of disciplined training, deep devotion, and unparalleled skill. Meet the national awardees and heritage keepers who create Kalasutraa's masterpieces.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {artisans.map((artisan, i) => (
              <ScrollReveal key={artisan.id} delay={i * 0.1}>
                <ArtisanCard {...artisan} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-secondary border-t border-border text-center">
        <div className="container mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-serif text-4xl mb-6">Own a Piece of Their Legacy</h2>
            <p className="text-muted-foreground mb-10 max-w-xl mx-auto text-lg">
              Explore the exquisite works created by these masters in our curated collections.
            </p>
            <Button href="/shop" variant="primary">Explore Collections</Button>
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
