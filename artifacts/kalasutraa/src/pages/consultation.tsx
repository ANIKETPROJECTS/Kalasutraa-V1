import { useSEO } from '../hooks/use-seo';
import { Layout } from '../components/Layout';
import { ScrollReveal } from '../components/ScrollReveal';
import { Accordion } from '../components/Accordion';
import { Calendar, User, Gem } from 'lucide-react';

const steps = [
  {
    icon: <User className="w-8 h-8" />,
    title: 'Discovery',
    description: 'We begin with a conversation to understand your aesthetic preferences, spatial requirements, and the story you wish to tell through art.'
  },
  {
    icon: <Gem className="w-8 h-8" />,
    title: 'Curation',
    description: 'Our curators will present a tailored selection of available pieces or propose a custom commission from our master artisans.'
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    title: 'Acquisition',
    description: 'We guide you through the acquisition process, including authenticity documentation, specialized crating, and insured global delivery.'
  }
];

const faqs = [
  {
    title: 'Is there a fee for the initial consultation?',
    content: 'No, initial discovery consultations are complimentary and carry no obligation to purchase.'
  },
  {
    title: 'Can you advise on art for corporate or hospitality spaces?',
    content: 'Yes, we frequently collaborate with interior designers, architects, and corporate buyers to curate collections for large-scale projects.'
  },
  {
    title: 'How long does a consultation take?',
    content: 'Typically, a first consultation lasts between 30 to 45 minutes, conducted via video call or in person at our atelier.'
  }
];

export default function Consultation() {
  useSEO({ title: 'Art Advisory & Consultation', description: 'Schedule a private art advisory session with Kalasutraa.' });

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-espresso text-white py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/seed/advisory/1920/1080')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <span className="block text-xs font-semibold tracking-widest uppercase text-accent mb-6">Art Advisory</span>
          <h1 className="font-serif text-5xl md:text-7xl mb-6">Curate Your Legacy</h1>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Acquiring heritage art is a deeply personal journey. Our advisory service provides expert guidance to help you find the piece that truly belongs in your space.
          </p>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-foreground mb-4">Our Advisory Process</h2>
            <div className="w-16 h-px bg-accent mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {steps.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.1} className="text-center group">
                <div className="w-20 h-20 mx-auto border border-border rounded-full flex items-center justify-center text-accent mb-6 group-hover:bg-accent group-hover:text-white transition-colors duration-500">
                  {step.icon}
                </div>
                <h3 className="font-serif text-2xl mb-4">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Booking & FAQ */}
      <section className="py-24 bg-secondary">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Calendly Placeholder */}
            <ScrollReveal>
              <div className="bg-card border border-border p-8 md:p-12 rounded shadow-sm text-center h-[500px] flex flex-col justify-center items-center">
                <h3 className="font-serif text-3xl mb-4">Schedule a Session</h3>
                <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto">
                  Select a convenient time for a video or phone consultation with one of our expert art advisors.
                </p>
                <div className="p-8 border border-dashed border-border rounded w-full bg-secondary/50 flex-1 flex items-center justify-center">
                  <a 
                    href="https://calendly.com/kalasutraa" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center justify-center tracking-widest uppercase text-xs font-semibold rounded transition-all duration-500 px-8 py-4 bg-primary text-white hover:bg-[#9c5517] hover:shadow-md"
                  >
                    Open Calendly
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* FAQ */}
            <ScrollReveal delay={0.2}>
              <div>
                <h2 className="font-serif text-3xl mb-8">Advisory FAQ</h2>
                <Accordion items={faqs} />
              </div>
            </ScrollReveal>
            
          </div>
        </div>
      </section>
    </Layout>
  );
}
