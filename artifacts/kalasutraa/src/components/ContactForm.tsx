import { useState } from 'react';
import { useSubmitContact } from '@workspace/api-client-react';
import { Button } from './Button';

export function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const mutation = useSubmitContact();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ data: formData });
  };

  if (mutation.isSuccess) {
    return (
      <div className="bg-[#E6F4EA] border border-[#B7E1C5] text-[#1E5631] p-8 rounded text-center">
        <h3 className="font-serif text-2xl mb-2">Message Received</h3>
        <p className="text-sm">Thank you for reaching out. Our atelier will be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {mutation.isError && (
        <div className="bg-destructive/10 text-destructive border border-destructive/20 p-4 rounded text-sm">
          There was an error sending your message. Please try again.
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Full Name</label>
          <input
            id="name"
            required
            type="text"
            className="w-full bg-background border border-border rounded px-4 py-3 focus:outline-none focus:border-accent transition-colors"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Email Address</label>
          <input
            id="email"
            required
            type="email"
            className="w-full bg-background border border-border rounded px-4 py-3 focus:outline-none focus:border-accent transition-colors"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Phone Number (Optional)</label>
        <input
          id="phone"
          type="tel"
          className="w-full bg-background border border-border rounded px-4 py-3 focus:outline-none focus:border-accent transition-colors"
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Message</label>
        <textarea
          id="message"
          required
          rows={5}
          className="w-full bg-background border border-border rounded px-4 py-3 focus:outline-none focus:border-accent transition-colors resize-none"
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
        ></textarea>
      </div>

      <Button type="submit" variant="luxury" className="w-full" disabled={mutation.isPending}>
        {mutation.isPending ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}
