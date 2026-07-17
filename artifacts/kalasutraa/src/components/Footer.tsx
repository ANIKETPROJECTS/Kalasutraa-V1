import { Link } from 'wouter';
import { CONTACT_INFO } from '../data/constants';

export function Footer() {
  return (
    <footer className="bg-espresso text-white border-t-4 border-accent">
      <div className="container mx-auto px-6 md:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="font-serif text-3xl tracking-widest uppercase text-accent">Kalasutraa</h3>
            <p className="text-sm text-gray-300 leading-relaxed font-serif italic text-lg">
              "{CONTACT_INFO.mottoSanskrit}"<br/>
              <span className="text-sm not-italic font-sans tracking-widest text-accent uppercase mt-2 block">{CONTACT_INFO.mottoEnglish}</span>
            </p>
            <p className="text-sm text-gray-400">
              Hands that Craft. Hearts that Care.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-accent mb-6">Atelier & Contact</h4>
            <address className="text-sm text-gray-300 not-italic leading-loose">
              {CONTACT_INFO.address.split(', ').map((line, i) => <div key={i}>{line}</div>)}
            </address>
            <div className="text-sm text-gray-300 mt-4 space-y-2">
              <a href={`mailto:${CONTACT_INFO.email}`} className="block hover:text-white transition-colors">{CONTACT_INFO.email}</a>
              <a href={`tel:${CONTACT_INFO.phone.replace(/\s+/g, '')}`} className="block hover:text-white transition-colors">{CONTACT_INFO.phone}</a>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-accent mb-6">Discover</h4>
            <div className="flex flex-col gap-3 text-sm text-gray-300">
              <Link href="/shop" className="hover:text-white transition-colors">Collections</Link>
              <Link href="/our-story" className="hover:text-white transition-colors">Our Story</Link>
              <Link href="/artisans" className="hover:text-white transition-colors">The Artisans</Link>
              <Link href="/consultation" className="hover:text-white transition-colors">Art Advisory</Link>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold tracking-widest uppercase text-accent mb-6">Connect</h4>
            <div className="flex flex-col gap-3 text-sm text-gray-300">
              <a href={CONTACT_INFO.social.instagram} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">Instagram {CONTACT_INFO.instagram}</a>
              <a href={CONTACT_INFO.social.youtube} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">YouTube</a>
            </div>
          </div>

        </div>

        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} Kalasutraa. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/contact" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
