import { useState } from 'react';
import { useSubmitEnquiry } from '@workspace/api-client-react';
import { Button } from './Button';

interface EnquiryFormProps {
  productSlug: string;
  productTitle: string;
}

export function EnquiryForm({ productSlug, productTitle }: EnquiryFormProps) {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const mutation = useSubmitEnquiry();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ 
      data: { 
        ...formData,
        productSlug,
        productTitle
      } 
    });
  };

  if (mutation.isSuccess) {
    return (
      <div className="bg-[#E6F4EA] border border-[#B7E1C5] text-[#1E5631] p-8 rounded text-center">
        <h3 className="font-serif text-2xl mb-2">Enquiry Received</h3>
        <p className="text-sm">Thank you for your interest in {productTitle}. Our art advisor will contact you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {mutation.isError && (
        <div className="bg-destructive/10 text-destructive border border-destructive/20 p-4 rounded text-sm">
          There was an error sending your enquiry. Please try again.
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-2">
          <label htmlFor="enq-name" className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Full Name</label>
          <input
            id="enq-name"
            required
            type="text"
            className="w-full bg-background border border-border rounded px-4 py-3 focus:outline-none focus:border-accent transition-colors"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="enq-email" className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Email Address</label>
          <input
            id="enq-email"
            required
            type="email"
            className="w-full bg-background border border-border rounded px-4 py-3 focus:outline-none focus:border-accent transition-colors"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="enq-phone" className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Phone Number (Optional)</label>
          <input
            id="enq-phone"
            type="tel"
            className="w-full bg-background border border-border rounded px-4 py-3 focus:outline-none focus:border-accent transition-colors"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="enq-message" className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">Message / Customization Request</label>
          <textarea
            id="enq-message"
            required
            rows={4}
            className="w-full bg-background border border-border rounded px-4 py-3 focus:outline-none focus:border-accent transition-colors resize-none"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            placeholder="I am interested in acquiring this piece..."
          ></textarea>
        </div>
      </div>

      <Button type="submit" variant="luxury" className="w-full" disabled={mutation.isPending}>
        {mutation.isPending ? 'Sending Enquiry...' : 'Submit Enquiry'}
      </Button>
    </form>
  );
}
