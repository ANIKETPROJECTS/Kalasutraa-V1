import { useState, useEffect } from 'react';
import { useSEO } from '../hooks/use-seo';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { ScrollReveal } from '../components/ScrollReveal';
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
      <section className="relative h-screen min-h-[700px] flex items-center justify-center bg-espresso text-white overflow-hidden">
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

      {/* 2. Collections Marquee */}
      <section
        className="py-32 overflow-hidden relative"
        style={{
          backgroundImage: 'url(/images/heritage-arch.jpg)',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 container mx-auto px-6 md:px-12">
          <ScrollReveal className="text-center mb-20">
            <h2
              className="text-lg font-semibold tracking-[0.2em] uppercase mb-5"
              style={{ color: '#f5c97a', textShadow: '0 1px 6px rgba(0,0,0,0.9), 0 0 20px rgba(0,0,0,0.7)' }}
            >Curated Portfolios</h2>
            <h3
              className="font-serif text-5xl md:text-6xl lg:text-7xl text-white"
              style={{ textShadow: '0 2px 8px rgba(0,0,0,0.95), 0 0 40px rgba(0,0,0,0.6)' }}
            >Timeless Art Forms</h3>
            <div className="w-12 h-px bg-white/80 mx-auto mt-8"></div>
          </ScrollReveal>
        </div>

        {/* Marquee strip — full bleed */}
        <div className="relative z-10 w-full">

          <div className="flex animate-marquee" style={{ width: 'max-content' }}>
            {[...collections, ...collections].map((c, i) => (
              <a
                key={`${c.slug}-${i}`}
                href={`/shop/${c.slug}`}
                className="group flex flex-col items-center text-center mx-10 w-80 shrink-0"
              >
                {/* Decorative frame */}
                <div className="relative mb-7" style={{ width: 280, height: 280 }}>
                  {/* Outermost dashed orbit — rotates slowly on hover */}
                  <div className="absolute rounded-full border border-dashed border-white/50 transition-all duration-700 group-hover:border-white/90"
                    style={{ inset: -14 }} />
                  {/* Second solid thin ring */}
                  <div className="absolute rounded-full border border-white/60 transition-all duration-500 group-hover:border-white"
                    style={{ inset: -6 }} />
                  {/* Diamond gems at cardinal points (sit on the second ring) */}
                  {[
                    { top: -10,  left: '50%',  transform: 'translateX(-50%) rotate(45deg)' },
                    { bottom: -10, left: '50%', transform: 'translateX(-50%) rotate(45deg)' },
                    { left: -10, top: '50%',   transform: 'translateY(-50%) rotate(45deg)' },
                    { right: -10, top: '50%',  transform: 'translateY(-50%) rotate(45deg)' },
                  ].map((style, j) => (
                    <div
                      key={j}
                      className="absolute w-[10px] h-[10px] bg-white opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ ...style, position: 'absolute' }}
                    />
                  ))}
                  {/* Image circle */}
                  <div className="absolute inset-0 rounded-full overflow-hidden shadow-2xl ring-[3px] ring-white/50 group-hover:ring-white transition-all duration-500">
                    <img
                      src={c.heroImage}
                      alt={c.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      loading="lazy"
                    />
                    {/* Warm vignette overlay */}
                    <div className="absolute inset-0 rounded-full"
                      style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(30,15,5,0.35) 100%)' }} />
                    <div className="absolute inset-0 rounded-full bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                <h3
                  className="font-serif text-2xl text-white group-hover:text-[#f5c97a] transition-colors leading-snug mb-3"
                  style={{ textShadow: '0 1px 6px rgba(0,0,0,0.95), 0 0 20px rgba(0,0,0,0.7)' }}
                >{c.title}</h3>
                <p
                  className="text-sm text-white/90 line-clamp-2 leading-relaxed max-w-[360px]"
                  style={{ textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}
                >{c.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Editorial Block */}
      <section className="relative py-36 text-white overflow-hidden">
        {/* ── Video background ── */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/images/editorial-bg.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* layered overlay: deep espresso tint so text stays legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/72" />
        {/* subtle warm vignette */}
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(90,40,10,0.18) 0%, transparent 75%)' }} />

        <div className="relative z-10 container mx-auto px-6 md:px-12">

          {/* Heading */}
          <ScrollReveal className="text-center mb-20">
            <p
              className="font-serif text-3xl md:text-4xl italic mb-5 leading-snug"
              style={{ color: '#E8C07A', textShadow: '0 2px 16px rgba(0,0,0,0.6)' }}
            >
              ❝{CONTACT_INFO.mottoSanskrit}❞
            </p>
            <h2
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-6"
              style={{ textShadow: '0 2px 20px rgba(0,0,0,0.7)' }}
            >Why These Art Forms Exist</h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-16 bg-[#C9973A]/60" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#C9973A]/80" />
              <div className="h-px w-16 bg-[#C9973A]/60" />
            </div>
          </ScrollReveal>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                num: '01',
                title: 'Art Rooted in Belief',
                body: "These aren't just decorative items. Whether it's the sacred geometry of Warli or the devotion poured into a Vrindavan carving, every piece was born to communicate with the divine before it was meant to be seen by man.",
                delay: 0.1,
              },
              {
                num: '02',
                title: 'Carried by Generations',
                body: 'Techniques like Dhokra metal casting are over 4,000 years old. Passed strictly from parent to child, these skills represent an unbroken chain of human knowledge and patience.',
                delay: 0.2,
              },
              {
                num: '03',
                title: 'Why Preservation Matters',
                body: "In an era of mass production, true craftsmanship is endangered. By acquiring these pieces, you don't just decorate your home—you sustain villages and ensure these stories survive.",
                delay: 0.3,
              },
            ].map(card => (
              <ScrollReveal key={card.num} delay={card.delay}>
                <div className="group relative h-full rounded-sm border border-white/10 bg-white/5 backdrop-blur-sm p-8 transition-all duration-500 hover:-translate-y-2 hover:bg-white/10 hover:border-[#C9973A]/50 hover:shadow-[0_8px_40px_rgba(0,0,0,0.45)]">
                  {/* accent top bar that grows on hover */}
                  <div className="absolute top-0 left-8 right-8 h-px bg-[#C9973A]/30 transition-all duration-500 group-hover:left-0 group-hover:right-0 group-hover:bg-[#C9973A]/70" />

                  {/* ordinal number */}
                  <span
                    className="block font-serif text-5xl font-bold mb-5 leading-none select-none transition-colors duration-300"
                    style={{ color: 'rgba(201,151,58,0.20)' }}
                  >{card.num}</span>

                  <h3 className="font-serif text-xl md:text-2xl text-white mb-4 group-hover:text-[#E8C07A] transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-sm text-white/65 leading-relaxed group-hover:text-white/85 transition-colors duration-300">
                    {card.body}
                  </p>

                  {/* bottom glow dot */}
                  <div className="absolute bottom-6 right-7 w-2 h-2 rounded-full bg-[#C9973A]/0 group-hover:bg-[#C9973A]/60 transition-all duration-500 shadow-[0_0_8px_rgba(201,151,58,0.8)]" />
                </div>
              </ScrollReveal>
            ))}
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
      <section
        className="py-32 relative overflow-hidden"
        style={{
          backgroundImage: 'url(/images/elephant-craft.jpg)',
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />

        <div className="relative z-10 container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <ScrollReveal>
              <h2
                className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
                style={{ color: '#f5c97a', textShadow: '0 1px 6px rgba(0,0,0,0.9)' }}
              >Masters of Craft</h2>
              <h3
                className="font-serif text-4xl text-white"
                style={{ textShadow: '0 2px 8px rgba(0,0,0,0.95)' }}
              >The Hands Behind the Art</h3>
            </ScrollReveal>
            <ScrollReveal>
              <Link
                href="/artisans"
                className="inline-flex items-center text-sm font-semibold tracking-widest uppercase text-white/90 hover:text-accent transition-colors pb-1 border-b border-white/60 hover:border-accent"
              >
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
                  <h4
                    className="font-serif text-2xl mb-1"
                    style={{ color: '#1c0e05', textShadow: '0 1px 6px rgba(255,245,220,0.95), 0 0 20px rgba(255,255,255,0.5)' }}
                  >{artisan.name}</h4>
                  <p
                    className="text-sm uppercase tracking-widest font-semibold"
                    style={{ color: '#7a3d10', textShadow: '0 1px 4px rgba(255,245,220,0.9)' }}
                  >{artisan.craft}</p>
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
