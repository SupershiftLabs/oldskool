import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Calendar, Users } from 'lucide-react';
import { toast } from 'sonner';

const ContactPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          subject: formData.subject,
          message: formData.message,
        });

      if (error) throw error;

      toast.success('Message sent successfully!', {
        description: 'We\'ll get back to you within 24 hours.',
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'general',
        message: '',
      });
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      value: '(123) 456-7890',
      link: 'tel:+1234567890',
    },
    {
      icon: Mail,
      title: 'Email',
      value: 'hello@oldskool.tours',
      link: 'mailto:hello@oldskool.tours',
    },
    {
      icon: MapPin,
      title: 'Location',
      value: '123 Retro Lane, Downtown',
      link: '#',
    },
    {
      icon: Clock,
      title: 'Hours',
      value: 'Daily 9AM - 10PM',
      link: '#',
    },
  ];

  const inquiryTypes = [
    { id: 'general', label: 'General Inquiry', icon: MessageSquare },
    { id: 'booking', label: 'Booking Question', icon: Calendar },
    { id: 'group', label: 'Group/Corporate', icon: Users },
    { id: 'custom', label: 'Custom Tour', icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20 md:pt-24">
      {/* Hero */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-[#1B4332]/30 to-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-[#F5F3E7] mb-4">
              Get in <span className="text-[#CCFF00]">Touch</span>
            </h1>
            <p className="text-lg text-[#F5F3E7]/70">
              Have questions about our tours? Planning a special event? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-[#F5F3E7] mb-6">Contact Info</h2>
              
              <div className="space-y-4 mb-8">
                {contactInfo.map((item, i) => (
                  <a
                    key={i}
                    href={item.link}
                    className="flex items-start gap-4 p-4 bg-[#F5F3E7]/5 rounded-xl border border-[#F5F3E7]/10 hover:border-[#CCFF00]/30 transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#CCFF00]/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#CCFF00]/20 transition-colors">
                      <item.icon className="w-5 h-5 text-[#CCFF00]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#F5F3E7]/50">{item.title}</p>
                      <p className="text-[#F5F3E7] font-medium">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Quick Links */}
              <div className="p-6 bg-[#1B4332]/30 rounded-xl border border-[#1B4332]/50">
                <h3 className="text-lg font-semibold text-[#F5F3E7] mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-[#F5F3E7]/70 hover:text-[#CCFF00] transition-colors text-sm">
                      FAQs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-[#F5F3E7]/70 hover:text-[#CCFF00] transition-colors text-sm">
                      Booking Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-[#F5F3E7]/70 hover:text-[#CCFF00] transition-colors text-sm">
                      Cancellation Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-[#F5F3E7]/70 hover:text-[#CCFF00] transition-colors text-sm">
                      Group Discounts
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-[#F5F3E7]/5 rounded-2xl border border-[#F5F3E7]/10 p-6 md:p-8">
                <h2 className="text-2xl font-bold text-[#F5F3E7] mb-6">Send us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Inquiry Type */}
                  <div>
                    <label className="block text-sm text-[#F5F3E7]/70 mb-3">What can we help you with?</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {inquiryTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, subject: type.id })}
                          className={`p-3 rounded-xl text-sm font-medium transition-all flex flex-col items-center gap-2 ${
                            formData.subject === type.id
                              ? 'bg-[#CCFF00] text-[#0A0A0A]'
                              : 'bg-[#F5F3E7]/5 text-[#F5F3E7]/70 hover:bg-[#F5F3E7]/10'
                          }`}
                        >
                          <type.icon className="w-5 h-5" />
                          <span className="text-xs">{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#F5F3E7]/70 mb-2">Name *</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#F5F3E7]/20 rounded-lg text-[#F5F3E7] focus:outline-none focus:border-[#CCFF00] transition-colors"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#F5F3E7]/70 mb-2">Email *</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#F5F3E7]/20 rounded-lg text-[#F5F3E7] focus:outline-none focus:border-[#CCFF00] transition-colors"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm text-[#F5F3E7]/70 mb-2">Phone (Optional)</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#F5F3E7]/20 rounded-lg text-[#F5F3E7] focus:outline-none focus:border-[#CCFF00] transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm text-[#F5F3E7]/70 mb-2">Message *</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      className="w-full px-4 py-3 bg-[#0A0A0A] border border-[#F5F3E7]/20 rounded-lg text-[#F5F3E7] focus:outline-none focus:border-[#CCFF00] transition-colors resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#CCFF00] text-[#0A0A0A] font-bold rounded-xl hover:bg-[#9EFF00] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-[#0A0A0A]/30 border-t-[#0A0A0A] rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-[#0A0A0A] to-[#1B4332]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F5F3E7]/5 rounded-2xl border border-[#F5F3E7]/10 overflow-hidden h-64 md:h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-[#CCFF00] mx-auto mb-4" />
              <p className="text-[#F5F3E7] font-medium">123 Retro Lane, Downtown District</p>
              <p className="text-[#F5F3E7]/50 text-sm mt-1">Pickup location for all tours</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
