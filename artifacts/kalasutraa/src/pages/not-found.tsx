import { useSEO } from '../hooks/use-seo';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';

export default function NotFound() {
  useSEO({ title: 'Page Not Found' });

  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-serif text-8xl md:text-[120px] text-accent mb-6 leading-none">404</h1>
        <h2 className="font-serif text-3xl md:text-4xl mb-4 text-foreground">Art Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-10 leading-relaxed">
          The masterpiece you are looking for seems to have been moved or no longer exists in our collection.
        </p>
        <Button href="/">Return to Atelier</Button>
      </div>
    </Layout>
  );
}
