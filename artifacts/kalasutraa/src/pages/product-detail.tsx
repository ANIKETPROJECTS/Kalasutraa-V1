import { useState } from 'react';
import { useSEO } from '../hooks/use-seo';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { EnquiryForm } from '../components/EnquiryForm';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import { useCart, useWishlist } from '../hooks/use-store';
import { useParams, Link } from 'wouter';
import NotFound from './not-found';
import { Heart, ShieldCheck, Truck, RefreshCw, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductDetail() {
  const { slug } = useParams();
  const product = products.find(p => p.slug === slug);
  const [activeImage, setActiveImage] = useState(0);
  const [showEnquiry, setShowEnquiry] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) return <NotFound />;

  useSEO({ title: product.title, description: product.description });

  const relatedProducts = products
    .filter(p => p.collectionSlug === product.collectionSlug && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <Layout>
      <div className="bg-background">
        {/* Breadcrumb */}
        <div className="container mx-auto px-6 md:px-12 py-6 text-xs tracking-widest uppercase font-semibold text-muted-foreground flex gap-2">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/shop/${product.collectionSlug}`} className="hover:text-primary transition-colors">Collection</Link>
          <span>/</span>
          <span className="text-foreground">{product.title}</span>
        </div>

        <section className="container mx-auto px-6 md:px-12 py-8 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-[3/4] bg-secondary rounded overflow-hidden group">
                <img
                  src={product.images[activeImage]}
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 origin-center group-hover:scale-150 cursor-zoom-in"
                />
                {product.badge && (
                  <div className="absolute top-6 left-6 bg-background/90 backdrop-blur text-[10px] tracking-widest uppercase font-semibold px-4 py-2 rounded-sm shadow-sm">
                    {product.badge}
                  </div>
                )}
              </div>
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((img, i) => (
                  <button 
                    key={i} 
                    onClick={() => setActiveImage(i)}
                    className={`aspect-square bg-secondary rounded overflow-hidden border-2 transition-colors ${activeImage === i ? 'border-primary' : 'border-transparent hover:border-border'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center">
              <div className="mb-8">
                <h1 className="font-serif text-4xl lg:text-5xl mb-4">{product.title}</h1>
                <p className="text-xl font-medium tracking-wide mb-6">{product.priceDisplay}</p>
                <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>
                
                <div className="flex items-center gap-4 text-sm font-medium border-y border-border py-4 mb-8">
                  <div>
                    <span className="text-muted-foreground text-xs uppercase tracking-widest block mb-1">Artisan</span>
                    <span className="text-foreground">{product.artisanName}</span>
                  </div>
                  <div className="w-px h-8 bg-border"></div>
                  <div>
                    <span className="text-muted-foreground text-xs uppercase tracking-widest block mb-1">Region</span>
                    <span className="text-foreground">{product.region}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  {product.enquiryOnly ? (
                    <Button onClick={() => setShowEnquiry(true)} variant="primary" className="w-full text-sm">
                      Enquire About This Piece
                    </Button>
                  ) : (
                    <div className="flex gap-4">
                      <Button 
                        onClick={() => addToCart(product)} 
                        variant="primary" 
                        className="flex-1"
                        disabled={product.soldOut}
                      >
                        {product.soldOut ? 'Sold Out' : 'Add to Cart'}
                      </Button>
                      <button 
                        onClick={() => toggleWishlist(product)}
                        className={`px-6 border rounded transition-colors flex items-center justify-center ${isInWishlist(product.slug) ? 'bg-primary border-primary text-white' : 'border-border text-foreground hover:border-primary hover:text-primary'}`}
                      >
                        <Heart size={20} className={isInWishlist(product.slug) ? "fill-current" : ""} />
                      </button>
                    </div>
                  )}
                  {(!product.enquiryOnly && !product.soldOut) && (
                     <Button onClick={() => setShowEnquiry(true)} variant="outline" className="w-full">
                       Contact Advisory for Curation
                     </Button>
                  )}
                </div>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-4 mb-12 py-6 border-t border-border">
                <div className="text-center">
                  <ShieldCheck className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <span className="text-[10px] tracking-widest uppercase font-semibold">Authenticity<br/>Certificate</span>
                </div>
                <div className="text-center">
                  <Truck className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <span className="text-[10px] tracking-widest uppercase font-semibold">Insured Global<br/>Shipping</span>
                </div>
                <div className="text-center">
                  <RefreshCw className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <span className="text-[10px] tracking-widest uppercase font-semibold">14-Day<br/>Returns</span>
                </div>
              </div>

              {/* Tabs */}
              <div>
                <div className="flex gap-8 border-b border-border mb-6">
                  <button 
                    onClick={() => setActiveTab('description')}
                    className={`pb-4 text-xs font-semibold tracking-widest uppercase transition-colors relative ${activeTab === 'description' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    Details
                    {activeTab === 'description' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>}
                  </button>
                  <button 
                    onClick={() => setActiveTab('shipping')}
                    className={`pb-4 text-xs font-semibold tracking-widest uppercase transition-colors relative ${activeTab === 'shipping' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    Shipping
                    {activeTab === 'shipping' && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>}
                  </button>
                </div>
                <div className="text-sm text-muted-foreground leading-relaxed">
                  {activeTab === 'description' && (
                    <p>Each Kalasutraa piece is an original handcrafted artwork. Due to the natural materials and human element involved in the creation process, minor variations in color, texture, and dimension are inherent and constitute the unique character of the piece.</p>
                  )}
                  {activeTab === 'shipping' && (
                    <p>We provide bespoke crating for all artworks to ensure their safe journey to your home. Domestic shipping within India typically takes 7-10 business days. International shipping requires 14-21 business days, inclusive of customs clearance. All shipments are fully insured against loss or damage.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-24 bg-secondary border-t border-border">
            <div className="container mx-auto px-6 md:px-12">
              <h2 className="font-serif text-3xl mb-12 text-center">More from this Craft</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {relatedProducts.map(p => (
                  <ProductCard key={p.slug} {...p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Enquiry Modal */}
      <AnimatePresence>
        {showEnquiry && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowEnquiry(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-card rounded shadow-2xl border border-border p-8 md:p-12 z-10 max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setShowEnquiry(false)}
                className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={24} />
              </button>
              <div className="mb-8">
                <span className="text-xs tracking-widest uppercase font-semibold text-primary block mb-2">Art Advisory</span>
                <h2 className="font-serif text-3xl">Enquire About This Piece</h2>
                <p className="text-muted-foreground text-sm mt-2 font-serif italic">"{product.title}"</p>
              </div>
              <EnquiryForm productSlug={product.slug} productTitle={product.title} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
