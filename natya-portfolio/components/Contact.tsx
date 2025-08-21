
import React, { useState } from 'react';
import Section from './Section';
import SectionHeading from './SectionHeading';
import Button from './Button';
import { PRIMARY_EMAIL, WEB3FORMS_ACCESS_KEY } from '../constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    if (WEB3FORMS_ACCESS_KEY === 'YOUR_ACCESS_KEY_HERE') {
      console.error("WEB3FORMS_ACCESS_KEY is not set. Please get your key from web3forms.com and add it to constants.ts");
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
      return;
    }

    const formDataWithKey = {
      ...formData,
      access_key: WEB3FORMS_ACCESS_KEY,
      subject: `New message from your Portfolio from ${formData.name}`,
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formDataWithKey),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        console.error('Form submission failed:', result);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch (error) {
      console.error('An error occurred during form submission:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  const inputClasses = "w-full bg-surface-light dark:bg-surface-dark border border-text-light/10 dark:border-text-dark/10 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-accent transition-all";

  return (
    <Section id="contact">
      <SectionHeading title="Get In Touch" subtitle="Contact Me" />
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-muted-light dark:text-muted-dark mb-8">
          I'm currently seeking new opportunities as a UI/UX Designer. Have a project or role in mind? Let's connect.
          You can reach me via email at <a href={`mailto:${PRIMARY_EMAIL}`} className="text-accent hover:underline">{PRIMARY_EMAIL}</a> or by using the form below.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6 text-left">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2 text-muted-light dark:text-muted-dark">Name</label>
              <input type="text" id="name" name="name" required className={inputClasses} value={formData.name} onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2 text-muted-light dark:text-muted-dark">Email</label>
              <input type="email" id="email" name="email" required className={inputClasses} value={formData.email} onChange={handleChange} />
            </div>
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2 text-muted-light dark:text-muted-dark">Message</label>
            <textarea id="message" name="message" rows={5} required className={inputClasses} value={formData.message} onChange={handleChange}></textarea>
          </div>
          <div className="text-center">
            <Button type="submit" variant="primary" disabled={status === 'sending'}>
              {status === 'idle' && 'Send Message'}
              {status === 'sending' && 'Sending...'}
              {status === 'success' && 'Message Sent!'}
              {status === 'error' && 'Error! Try Again'}
            </Button>
            {status === 'success' && <p className="text-sm text-green-500 mt-4">Thank you for your message! I'll get back to you shortly.</p>}
            {status === 'error' && <p className="text-sm text-red-500 mt-4">Something went wrong. Please add your Access Key or try again later.</p>}
          </div>
        </form>
      </div>
    </Section>
  );
};

export default Contact;