import { useState } from 'react';
import { useSubscribeNewsletter } from '@workspace/api-client-react';
import { Button } from './Button';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const mutation = useSubscribeNewsletter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    mutation.mutate({ data: { email } });
  };

  if (mutation.isSuccess) {
    return (
      <div className="text-center p-6 border border-accent rounded bg-espresso text-white">
        <h3 className="font-serif text-xl mb-2">Welcome to the Atelier</h3>
        <p className="text-sm text-gray-300">You are now subscribed. Check your email for your 10% welcome gift.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto w-full">
      <input
        type="email"
        required
        placeholder="Enter your email address"
        className="flex-1 bg-transparent border-b-2 border-accent px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none focus:border-white transition-colors"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit" variant="luxury" className="shrink-0 border-accent" disabled={mutation.isPending}>
        {mutation.isPending ? 'Subscribing...' : 'Subscribe'}
      </Button>
      {mutation.isError && (
        <p className="text-destructive text-xs absolute -bottom-6 w-full text-center">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
