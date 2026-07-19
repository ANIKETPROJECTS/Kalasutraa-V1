import { useState, useEffect } from 'react';
import { useSEO } from '../hooks/use-seo';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { ScrollReveal } from '../components/ScrollReveal';
import { CollectionCard } from '../components/CollectionCard';
import { TestimonialCard } from '../components/TestimonialCard';
import { NewsletterSignup } from '../components/NewsletterSignup';
import { collections } from '../data/collections';
import { testimonials } from '../data/testimonials';
import { artisans } from '../data/artisans';
import { CONTACT_INFO } from '../data/constants';
import { ShieldCheck, Paintbrush, HeadphonesIcon } from 'lucide-react';
import { Link } from 'wouter';

const heroImages = [
  '/images/hero-1.jpg',
  '/images/hero-2.jpg',
  '/images/hero-3.jpg',
  '/images/hero-4.jpg',
];

const typePhrases = [
  'Discover museum-quality Indian art, crafted by master artisans carrying centuries of skill.',
  'Each piece tells a story woven in tradition, devotion, and unmatched craftsmanship.',
  'Where ancient heritage meets the modern collector\'s discerning eye.',
  'Bridging sacred art villages of India with homes around the world.',
];

export default function Home() {
  useSEO({ title: 'Luxury Indian Traditional Art', description: 'Kalasutraa is where heritage breathes and art finds its home.' });
  const [heroIdx, setHeroIdx] = useState(0);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Hero carousel — change every 6 s
  useEffect(() => {
    const t = setInterval(() => setHeroIdx(i => (i + 1) % heroImages.length), 6000);
    return () => clearInterval(t);
  }, []);

  // Typewriter
  useEffect(() => {
    const current = typePhrases[phraseIdx];
    if (!isDeleting && displayed.length < current.length) {
      const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 42);
      return () => clearTimeout(t);
    }
    if (!isDeleting && displayed.length === current.length) {
      const t = setTimeout(() => setIsDeleting(true), 2800);
      return () => clearTimeout(t);
    }
    if (isDeleting && displayed.length > 0) {
      const t = setTimeout(() => setDisplayed(d => d.slice(0, -1)), 18);
      return () => clearTimeout(t);
    }
    if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setPhraseIdx(i => (i + 1) % typePhrases.length);
    }
  }, [displayed, isDeleting, phraseIdx]);

  return (
    <Layout>
      {/* 1. Hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center bg-espresso text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          {heroImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="Traditional Artisan at work"
              className={`absolute inset-0 w-full h-full object-cover mix-blend-luminosity transition-opacity duration-[2500ms] hero-pan ${i === heroIdx ? 'opacity-45' : 'opacity-0'}`}
              style={{ animationDelay: `${-i * 2}s` }}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          ))}
        </div>

        {/* Dot indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setHeroIdx(i)}
              className={`rounded-full transition-all duration-500 ${i === heroIdx ? 'w-6 h-1.5 bg-accent' : 'w-1.5 h-1.5 bg-white/30 hover:bg-white/60'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        
        <div className="container relative z-10 px-6 mt-16 flex flex-col items-center text-center">
          <ScrollReveal className="w-full flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 mb-8 border border-white/20 rounded-full px-4 py-1.5 bg-white/5 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              <span className="text-[10px] tracking-[0.2em] uppercase font-semibold">100% Made in India</span>
            </div>

            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-6 drop-shadow-lg max-w-5xl text-center">
              Where Heritage Breathes
            </h1>

            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-10 font-light leading-relaxed min-h-[3.5rem] flex items-center justify-center text-center">
              <span>
                {displayed}
                <span className="inline-block w-[2px] h-[1.1em] bg-accent ml-[2px] align-middle animate-[blink_1s_step-end_infinite]" />
              </span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button href="/shop" variant="primary">Explore Collections</Button>
              <Button href="/consultation" variant="ghost" className="text-white hover:text-accent border border-transparent hover:border-accent">
                Book Advisory Session
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px w-full bg-[#8A6D3B]/30"></div>

      {/* 2. Collections Grid */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <ScrollReveal className="text-center mb-20">
            <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">Curated Portfolios</h2>
            <h3 className="font-serif text-4xl md:text-5xl text-foreground">Timeless Art Forms</h3>
            <div className="w-12 h-px bg-foreground mx-auto mt-8"></div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {collections.map((collection, i) => (
              <ScrollReveal key={collection.slug} delay={i * 0.1}>
                <CollectionCard {...collection} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Editorial Block */}
      <section className="py-32 bg-espresso text-white relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-20">
            <p className="font-serif text-2xl md:text-3xl text-accent italic mb-6">"{CONTACT_INFO.mottoSanskrit}"</p>
            <h2 className="font-serif text-4xl md:text-5xl">Why These Art Forms Exist</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
            <ScrollReveal delay={0.1}>
              <div className="border-t border-accent pt-6">
                <h3 className="text-xl font-serif mb-4">Art Rooted in Belief</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  These aren't just decorative items. Whether it's the sacred geometry of Warli or the devotion poured into a Vrindavan carving, every piece was born to communicate with the divine before it was meant to be seen by man.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="border-t border-accent pt-6">
                <h3 className="text-xl font-serif mb-4">Carried by Generations</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Techniques like Dhokra metal casting are over 4,000 years old. Passed strictly from parent to child, these skills represent an unbroken chain of human knowledge and patience.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="border-t border-accent pt-6">
                <h3 className="text-xl font-serif mb-4">Why Preservation Matters</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  In an era of mass production, true craftsmanship is endangered. By acquiring these pieces, you don't just decorate your home—you sustain villages and ensure these stories survive.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. Client Experiences */}
      <section className="py-32 bg-secondary">
        <div className="container mx-auto px-6 md:px-12">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-serif text-4xl text-foreground">Client Experiences</h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.id} delay={i * 0.1}>
                <TestimonialCard {...t} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Advisory CTA */}
      <section className="py-24 bg-background border-y border-border">
        <div className="container mx-auto px-6 md:px-12">
          <ScrollReveal className="max-w-4xl mx-auto text-center flex flex-col items-center">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">Find the Piece That Truly Belongs in Your Space</h2>
            <p className="text-muted-foreground mb-10 max-w-2xl text-lg">
              Our curators assist collectors, designers, and enthusiasts in acquiring the perfect heritage artwork. Schedule a complimentary video session.
            </p>
            <Button href="/consultation" variant="primary">Schedule Consultation</Button>
            <p className="text-xs text-muted-foreground mt-4 uppercase tracking-widest font-semibold">No obligation to purchase</p>
          </ScrollReveal>
        </div>
      </section>

      {/* 6. Artisan Preview */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <ScrollReveal>
              <h2 className="text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">Masters of Craft</h2>
              <h3 className="font-serif text-4xl text-foreground">The Hands Behind the Art</h3>
            </ScrollReveal>
            <ScrollReveal>
              <Link href="/artisans" className="inline-flex items-center text-sm font-semibold tracking-widest uppercase text-foreground hover:text-primary transition-colors pb-1 border-b border-foreground hover:border-primary">
                Meet All Artisans
              </Link>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {artisans.slice(0, 3).map((artisan, i) => (
              <ScrollReveal key={artisan.id} delay={i * 0.1}>
                <div className="group cursor-pointer">
                  <div className="overflow-hidden rounded aspect-square mb-6 bg-secondary relative">
                    <img 
                      src={artisan.photo}
                      alt={artisan.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" 
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <span className="text-white uppercase tracking-widest text-xs font-semibold border border-white px-4 py-2 rounded-sm">View Profile</span>
                    </div>
                  </div>
                  <h4 className="font-serif text-2xl text-foreground mb-1">{artisan.name}</h4>
                  <p className="text-sm text-primary uppercase tracking-widest font-semibold">{artisan.craft}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Feature Strip */}
      <section className="py-16 bg-espresso text-white border-y-4 border-accent">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="flex flex-col items-center text-center px-6 py-4">
              <ShieldCheck className="w-8 h-8 text-accent mb-4" />
              <h4 className="font-serif text-xl mb-2">Authenticity Certified</h4>
              <p className="text-sm text-gray-400">Direct from artisan to your home.</p>
            </div>
            <div className="flex flex-col items-center text-center px-6 py-4">
              <Paintbrush className="w-8 h-8 text-accent mb-4" />
              <h4 className="font-serif text-xl mb-2">Tailored To Your Taste</h4>
              <p className="text-sm text-gray-400">Custom commissions available.</p>
            </div>
            <div className="flex flex-col items-center text-center px-6 py-4">
              <HeadphonesIcon className="w-8 h-8 text-accent mb-4" />
              <h4 className="font-serif text-xl mb-2">Speak With An Expert</h4>
              <p className="text-sm text-gray-400">Complimentary curation advisory.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Newsletter */}
      <section className="py-32 bg-[url('https://picsum.photos/seed/texture/1920/1080')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-background/95 backdrop-blur-sm"></div>
        <div className="container mx-auto px-6 relative z-10">
          <ScrollReveal className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-4xl mb-4">Join the Atelier</h2>
            <p className="text-muted-foreground mb-10">
              Sign up and receive 10% off your first order, along with stories of our artisans and early access to new collections.
            </p>
            <NewsletterSignup />
          </ScrollReveal>
        </div>
      </section>
    </Layout>
  );
}
