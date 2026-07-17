import { useState, useMemo } from 'react';
import { useSEO } from '../hooks/use-seo';
import { Layout } from '../components/Layout';
import { ProductCard } from '../components/ProductCard';
import { ScrollReveal } from '../components/ScrollReveal';
import { products } from '../data/products';
import { collections } from '../data/collections';
import { LayoutGrid, GripHorizontal, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { useLocation } from 'wouter';

export default function Shop() {
  const [location, setLocation] = useLocation();
  const [filterCraft, setFilterCraft] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<string>('featured');
  const [gridCols, setGridCols] = useState<number>(3);
  
  useSEO({ title: 'Shop Collections', description: 'Explore our entire collection of heritage Indian art.' });

  const filteredProducts = useMemo(() => {
    let result = [...products];
    if (filterCraft !== 'all') {
      result = result.filter(p => p.collectionSlug === filterCraft);
    }
    
    switch(sortOrder) {
      case 'price-low':
        return result.sort((a, b) => a.price - b.price);
      case 'price-high':
        return result.sort((a, b) => b.price - a.price);
      case 'featured':
      default:
        return result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  }, [filterCraft, sortOrder]);

  return (
    <Layout>
      <div className="bg-espresso text-white py-20 text-center">
        <h1 className="font-serif text-5xl mb-4">The Atelier</h1>
        <p className="text-gray-300">Discover masterpieces crafted by Indian hands.</p>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar */}
          <div className="w-full lg:w-64 shrink-0 space-y-10">
            <div>
              <h3 className="text-xs font-semibold tracking-widest uppercase text-foreground mb-4 pb-2 border-b border-border">Collections</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setFilterCraft('all')}
                  className={`block text-sm text-left w-full transition-colors ${filterCraft === 'all' ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}
                >
                  All Artworks
                </button>
                {collections.map(c => (
                  <button 
                    key={c.slug}
                    onClick={() => setFilterCraft(c.slug)}
                    className={`block text-sm text-left w-full transition-colors ${filterCraft === c.slug ? 'text-primary font-medium' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    {c.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 pb-4 border-b border-border">
              <p className="text-sm text-muted-foreground">{filteredProducts.length} Results</p>
              
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <button className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors">
                    Sort: {sortOrder === 'featured' ? 'Featured' : sortOrder === 'price-low' ? 'Price: Low to High' : 'Price: High to Low'}
                    <ChevronDown size={14} />
                  </button>
                  <div className="absolute top-full right-0 w-48 bg-card border border-border shadow-lg rounded p-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-opacity z-10">
                    <button onClick={() => setSortOrder('featured')} className="block w-full text-left px-3 py-2 text-sm hover:bg-secondary rounded">Featured</button>
                    <button onClick={() => setSortOrder('price-low')} className="block w-full text-left px-3 py-2 text-sm hover:bg-secondary rounded">Price: Low to High</button>
                    <button onClick={() => setSortOrder('price-high')} className="block w-full text-left px-3 py-2 text-sm hover:bg-secondary rounded">Price: High to Low</button>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-2 text-muted-foreground">
                  <button onClick={() => setGridCols(2)} className={`hover:text-primary ${gridCols === 2 ? 'text-primary' : ''}`}><GripHorizontal size={20} /></button>
                  <button onClick={() => setGridCols(3)} className={`hover:text-primary ${gridCols === 3 ? 'text-primary' : ''}`}><LayoutGrid size={20} /></button>
                  <button onClick={() => setGridCols(4)} className={`hover:text-primary ${gridCols === 4 ? 'text-primary' : ''}`}><SlidersHorizontal size={20} /></button>
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-${gridCols} gap-x-8 gap-y-12`}>
              {filteredProducts.map((product, i) => (
                <ScrollReveal key={product.slug} delay={i * 0.05}>
                  <ProductCard {...product} />
                </ScrollReveal>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-24 bg-secondary rounded border border-border">
                <h2 className="font-serif text-2xl mb-2">No artworks found</h2>
                <p className="text-muted-foreground">Try adjusting your filters to see more results.</p>
                <button onClick={() => setFilterCraft('all')} className="mt-6 text-sm text-primary uppercase tracking-widest font-semibold hover:underline">Clear Filters</button>
              </div>
            )}
            
            {/* Pagination Placeholder */}
            {filteredProducts.length > 0 && (
              <div className="mt-16 flex justify-center items-center gap-2">
                <button className="w-10 h-10 flex items-center justify-center border border-border rounded hover:border-primary hover:text-primary transition-colors" disabled>←</button>
                <button className="w-10 h-10 flex items-center justify-center border border-primary bg-primary text-white rounded">1</button>
                <button className="w-10 h-10 flex items-center justify-center border border-border rounded hover:border-primary hover:text-primary transition-colors">2</button>
                <button className="w-10 h-10 flex items-center justify-center border border-border rounded hover:border-primary hover:text-primary transition-colors">→</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
