import { useSEO } from '../hooks/use-seo';
import { Layout } from '../components/Layout';
import { ScrollReveal } from '../components/ScrollReveal';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { Button } from '../components/Button';

export default function OurStory() {
  useSEO({ title: 'Our Story', description: 'The philosophy and heritage behind Kalasutraa.' });

  return (
    <Layout>
      {/* Hero — looping video, no tint */}
      <section className="relative overflow-hidden flex items-center justify-center text-white" style={{minHeight: '85vh'}}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/hero-story.mp4"
        />
        <div className="relative z-10 text-center px-6 py-32 container mx-auto">
          <span className="block text-xs font-semibold tracking-widest uppercase text-accent mb-6 drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">EST. 2026</span>
          <h1 className="font-serif text-5xl md:text-7xl mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">Preserving the Soul of India</h1>
          <p className="text-gray-100 max-w-2xl mx-auto text-lg leading-relaxed font-light drop-shadow-[0_1px_6px_rgba(0,0,0,0.8)]">
            We are not just a gallery. We are a bridge between the ancient hands that craft and the modern homes that care.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-accent text-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
            <div className="py-4">
              <div className="font-serif text-5xl mb-2">
                <AnimatedCounter value={500} suffix="+" />
              </div>
              <p className="text-xs uppercase tracking-widest font-semibold">Artisans Supported</p>
            </div>
            <div className="py-4">
              <div className="font-serif text-5xl mb-2">
                <AnimatedCounter value={30} suffix="+" />
              </div>
              <p className="text-xs uppercase tracking-widest font-semibold">Villages Reached</p>
            </div>
            <div className="py-4">
              <div className="font-serif text-5xl mb-2">
                <AnimatedCounter value={5000} suffix="+" />
              </div>
              <p className="text-xs uppercase tracking-widest font-semibold">Years of Heritage</p>
            </div>
          </div>
        </div>
      </section>

      {/* Narrative */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div className="relative aspect-[4/5] rounded overflow-hidden">
                <img
                  src="https://kalasutraa.com/cdn/shop/files/file_000000005c587209ab1172da9f3f8ae2.png?v=1782467048&width=1200"
                  alt="Artisan working"
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <h2 className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">The Genesis</h2>
              <h3 className="font-serif text-4xl mb-6">Born from Reverence</h3>
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <p>
                  Kalasutraa was founded on a simple realization: India's most profound art forms were slowly fading, confined to dusty museum corners or replaced by mass-produced imitations. The true masters—guardians of centuries-old techniques—were struggling to find an audience that understood the depth of their work.
                </p>
                <p>
                  We traveled across the hinterlands, from the vibrant artist villages of Odisha to the sacred stone carvers of Vrindavan. What we found was magic. We found devotion carved into sandstone, mythology painted onto palm leaves, and history cast in bell metal.
                </p>
                <p>
                  Our mission became clear: to elevate these traditional crafts to their rightful place as luxury heritage art, ensuring the artisans receive the respect, recognition, and remuneration they deserve.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6 md:px-12">
          <ScrollReveal className="text-center mb-16">
            <h2 className="font-serif text-4xl">How We Work</h2>
            <div className="w-16 h-px bg-accent mx-auto mt-6"></div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <ScrollReveal delay={0.1}>
              <div className="bg-card p-10 rounded border border-border h-full">
                <span className="text-4xl font-serif text-accent/30 mb-6 block">01</span>
                <h3 className="font-serif text-2xl mb-4">Concept</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We collaborate with master artisans to select motifs, narratives, and scales that respect tradition while fitting seamlessly into contemporary spaces.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="bg-card p-10 rounded border border-border h-full">
                <span className="text-4xl font-serif text-accent/30 mb-6 block">02</span>
                <h3 className="font-serif text-2xl mb-4">Craft</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  The creation process cannot be rushed. Colors are ground from stones, metal is cast in mud and wax, and wood is slowly shaped over months.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="bg-card p-10 rounded border border-border h-full">
                <span className="text-4xl font-serif text-accent/30 mb-6 block">03</span>
                <h3 className="font-serif text-2xl mb-4">Creation</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Once completed, the artwork undergoes rigorous quality checks before being securely crated and delivered to collectors worldwide with its certificate of provenance.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Deep Dive */}
      <section className="py-24 bg-espresso text-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal className="order-2 lg:order-1">
              <h2 className="text-xs font-semibold tracking-widest uppercase text-accent mb-4">Regional Focus</h2>
              <h3 className="font-serif text-4xl mb-6">The Heart of Odisha</h3>
              <div className="space-y-6 text-gray-300 leading-relaxed mb-8">
                <p>
                  While our collection spans the subcontinent, our deepest roots lie in Odisha—a land where art and spirituality are inseparable.
                </p>
                <p>
                  From the intricate Pattachitra scrolls of Raghurajpur to the vibrant appliqué work of Pipili and the ancient Dhokra casting of the tribal belt, Odisha is a living museum of human creativity. We work closely with the guilds here to preserve the strict geometric codes and natural dye processes that define authentic Odia craft.
                </p>
              </div>
              <Button href="/shop" variant="outline" className="border-accent text-white hover:bg-accent hover:text-white">Discover The Collection</Button>
            </ScrollReveal>
            <ScrollReveal delay={0.2} className="order-1 lg:order-2">
              <div className="grid grid-cols-2 gap-4">
                <img src="https://kalasutraa.com/cdn/shop/files/1768563995923_1_83274069-c2aa-4ab0-952d-b3f0c05f145e.jpg?v=1771315123&width=800" alt="Pattachitra details" className="rounded w-full h-full object-cover" />
                <img src="https://kalasutraa.com/cdn/shop/files/1768564032429_1.jpg?v=1771315121&width=800" alt="Artisan hands" className="rounded w-full h-full object-cover mt-8" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Philosophy Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <ScrollReveal>
            <h2 className="font-serif text-4xl mb-16">Our Core Tenets</h2>
          </ScrollReveal>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Heritage', desc: 'Preserving uncompromising ancient techniques.' },
              { title: 'Sustainability', desc: 'Using natural colors and eco-conscious materials.' },
              { title: 'Respect', desc: 'Naming and honoring the individual artisan.' },
              { title: 'Authenticity', desc: 'Strict provenance and zero mass-production.' }
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1} className="p-8 border border-border rounded bg-secondary/30">
                <h4 className="font-serif text-xl text-primary mb-3">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
