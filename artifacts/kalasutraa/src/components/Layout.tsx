import { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[100dvh] flex flex-col selection:bg-accent selection:text-white">
      <Header />
      <main className="flex-1 bg-background pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
