import { useSEO } from '../hooks/use-seo';
import { Layout } from '../components/Layout';
import { ScrollReveal } from '../components/ScrollReveal';
import { ContactForm } from '../components/ContactForm';
import { Accordion } from '../components/Accordion';
import { CONTACT_INFO } from '../data/constants';

const faqs = [
  {
    title: 'Do you ship internationally?',
    content: 'Yes, we offer fully insured global shipping for all our artworks. Each piece is crated in custom-built wooden enclosures to ensure pristine delivery. Shipping costs are calculated based on dimensions and destination.',
  },
  {
    title: 'Can I commission a custom piece?',
    content: 'Absolutely. Many of our master artisans accept private commissions. The timeline varies by craft—a Pattachitra may take 2-4 months, while intricate stone or metal sculptures may take 6-12 months. Please contact us to discuss your vision.',
  },
  {
    title: 'How do you guarantee authenticity?',
    content: 'Every artwork is accompanied by a Certificate of Authenticity detailing the artisan’s name, region, craft techniques, and a seal of provenance from Kalasutraa. We work directly with the artisans, eliminating middlemen.',
  },
];

export default function Contact() {
  useSEO({ title: 'Contact Us', description: 'Get in touch with the Kalasutraa atelier.' });

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-espresso text-white py-32 border-b-4 border-accent relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://kalasutraa.com/cdn/shop/files/ChatGPT_Image_Apr_28_2026_12_28_29_PM.png?v=1777359628&width=2400')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <span className="block text-xs font-semibold tracking-widest uppercase text-accent mb-6">Atelier & Support</span>
          <h1 className="font-serif text-5xl md:text-7xl mb-6">Get in Touch</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg">
            Whether you are looking to acquire a piece, commission a specific artwork, or simply learn more about our heritage crafts, our team is here to assist you.
          </p>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left: Contact Info & FAQ */}
            <ScrollReveal>
              <div className="space-y-16">
                <div>
                  <h2 className="font-serif text-3xl mb-8">The Atelier</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">Visit Us</h3>
                      <p className="text-foreground leading-relaxed max-w-xs">{CONTACT_INFO.address}</p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">Direct Contact</h3>
                      <p className="text-foreground">
                        <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-primary transition-colors block">{CONTACT_INFO.email}</a>
                        <a href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`} className="hover:text-primary transition-colors block">{CONTACT_INFO.phone}</a>
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-2">Hours</h3>
                      <p className="text-foreground">
                        Monday – Friday<br />
                        10:00 AM – 6:00 PM (IST)
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="font-serif text-3xl mb-8">Frequently Asked Questions</h2>
                  <Accordion items={faqs} />
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Form */}
            <ScrollReveal delay={0.2}>
              <div className="bg-card border border-border p-8 md:p-12 rounded shadow-sm">
                <h2 className="font-serif text-3xl mb-2">Send a Message</h2>
                <p className="text-muted-foreground text-sm mb-8">Fill out the form below and we will get back to you promptly.</p>
                <ContactForm />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </Layout>
  );
}
