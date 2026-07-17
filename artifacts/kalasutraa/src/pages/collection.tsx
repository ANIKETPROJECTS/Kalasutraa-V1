import { useSEO } from '../hooks/use-seo';
import { Layout } from '../components/Layout';
import { ProductCard } from '../components/ProductCard';
import { ScrollReveal } from '../components/ScrollReveal';
import { products } from '../data/products';
import { collections } from '../data/collections';
import { useParams } from 'wouter';
import NotFound from './not-found';

export default function Collection() {
  const { slug } = useParams();
  const collection = collections.find(c => c.slug === slug);
  
  if (!collection) return <NotFound />;

  const collectionProducts = products.filter(p => p.collectionSlug === slug);
  useSEO({ title: collection.title, description: collection.description });

  return (
    <Layout>
      {/* Collection Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center bg-espresso text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={collection.heroImage}
            alt={collection.title}
            className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/50 to-transparent"></div>
        </div>
        
        <div className="container relative z-10 text-center px-6">
          <ScrollReveal>
            <span className="block text-xs font-semibold tracking-widest uppercase text-accent mb-4">{collection.category}</span>
            <h1 className="font-serif text-5xl md:text-7xl mb-6">{collection.title}</h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
              {collection.description}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          
          <div className="flex justify-between items-end mb-12 pb-4 border-b border-border">
            <h2 className="font-serif text-3xl text-foreground">Available Artworks</h2>
            <p className="text-sm text-muted-foreground">{collectionProducts.length} Pieces</p>
          </div>

          {collectionProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {collectionProducts.map((product, i) => (
                <ScrollReveal key={product.slug} delay={i * 0.1}>
                  <ProductCard {...product} />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-secondary rounded border border-border">
              <h3 className="font-serif text-2xl mb-2">Collection Being Curated</h3>
              <p className="text-muted-foreground">New pieces for {collection.title} are currently being crafted by our artisans.</p>
            </div>
          )}
          
        </div>
      </section>
    </Layout>
  );
}
