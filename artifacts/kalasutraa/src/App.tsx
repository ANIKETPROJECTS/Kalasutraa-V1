import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';

import Home from './pages/home';
import OurStory from './pages/our-story';
import Artisans from './pages/artisans';
import Shop from './pages/shop';
import Collection from './pages/collection';
import ProductDetail from './pages/product-detail';
import Consultation from './pages/consultation';
import Contact from './pages/contact';
import Cart from './pages/cart';
import Wishlist from './pages/wishlist';
import NotFound from './pages/not-found';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/our-story" component={OurStory} />
      <Route path="/artisans" component={Artisans} />
      <Route path="/shop" component={Shop} />
      <Route path="/shop/:slug" component={Collection} />
      <Route path="/shop/product/:slug" component={ProductDetail} />
      <Route path="/consultation" component={Consultation} />
      <Route path="/contact" component={Contact} />
      <Route path="/cart" component={Cart} />
      <Route path="/wishlist" component={Wishlist} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
