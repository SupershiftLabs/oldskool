import React, { useState } from 'react';
import { useStore } from '@/store/useStore';
import { supabase } from '@/lib/supabase';
import { X, Calendar, Users, Clock, CreditCard, Check, QrCode } from 'lucide-react';
import { toast } from 'sonner';

const BookingModal: React.FC = () => {
  const { isBookingModalOpen, setBookingModalOpen, selectedTour, setSelectedTour } = useStore();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [ticketCode, setTicketCode] = useState('');
  
  const [formData, setFormData] = useState({
    date: '',
    time: '10:00',
    guests: 2,
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '18:00', '19:00'];
  
  const totalPrice = selectedTour ? selectedTour.price * formData.guests : 0;

  const generateQRCode = () => {
    return `OST-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  };

  const handleSubmit = async () => {
    if (!selectedTour) return;
    
    setIsLoading(true);
    try {
      // Create or find customer
      const { data: existingCustomer } = await supabase
        .from('customers')
        .select('id')
        .eq('email', formData.email)
        .single();

      let customerId = existingCustomer?.id;

      if (!customerId) {
        const { data: newCustomer, error: customerError } = await supabase
          .from('customers')
          .insert({
            email: formData.email,
            name: formData.name,
            phone: formData.phone,
          })
          .select('id')
          .single();

        if (customerError) throw customerError;
        customerId = newCustomer.id;
      }

      // Create booking
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          customer_id: customerId,
          tour_id: selectedTour.id,
          booking_date: formData.date,
          booking_time: formData.time,
          guests: formData.guests,
          total_amount: totalPrice,
          status: 'confirmed',
          notes: formData.notes,
        })
        .select('id')
        .single();

      if (bookingError) throw bookingError;

      // Generate tickets for each guest
      const qrCode = generateQRCode();
      const { error: ticketError } = await supabase
        .from('tickets')
        .insert({
          booking_id: booking.id,
          qr_code: qrCode,
          guest_name: formData.name,
          status: 'valid',
        });

      if (ticketError) throw ticketError;

      setTicketCode(qrCode);
      setBookingComplete(true);
      toast.success('Booking confirmed!');
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to complete booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setBookingModalOpen(false);
    setSelectedTour(null);
    setStep(1);
    setBookingComplete(false);
    setTicketCode('');
    setFormData({
      date: '',
      time: '10:00',
      guests: 2,
      name: '',
      email: '',
      phone: '',
      notes: '',
    });
  };

  if (!isBookingModalOpen || !selectedTour) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg bg-[#0A0A0A] rounded-2xl z-50 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="relative h-32 md:h-40 overflow-hidden">
          <img
            src={selectedTour.image_url}
            alt={selectedTour.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] to-transparent" />
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-3 left-4 right-4">
            <h2 className="text-xl font-bold text-[#F5F3E7]">{selectedTour.name}</h2>
            <div className="flex items-center gap-3 mt-1 text-sm text-[#F5F3E7]/70">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {selectedTour.duration}
              </span>
              <span className="text-[#CCFF00] font-bold">${selectedTour.price}/person</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {bookingComplete ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#CCFF00] rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-[#0A0A0A]" />
              </div>
              <h3 className="text-2xl font-bold text-[#F5F3E7] mb-2">Booking Confirmed!</h3>
              <p className="text-[#F5F3E7]/70 mb-6">Your tickets have been sent to {formData.email}</p>
              
              <div className="bg-[#F5F3E7]/5 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <QrCode className="w-5 h-5 text-[#CCFF00]" />
                  <span className="text-[#F5F3E7]/70 text-sm">Your Ticket Code</span>
                </div>
                <p className="text-[#CCFF00] font-mono text-lg font-bold">{ticketCode}</p>
              </div>

              <div className="text-left bg-[#1B4332]/30 rounded-xl p-4 space-y-2">
                <p className="text-[#F5F3E7]/70 text-sm">
                  <span className="text-[#F5F3E7]">Tour:</span> {selectedTour.name}
                </p>
                <p className="text-[#F5F3E7]/70 text-sm">
                  <span className="text-[#F5F3E7]">Date:</span> {formData.date}
                </p>
                <p className="text-[#F5F3E7]/70 text-sm">
                  <span className="text-[#F5F3E7]">Time:</span> {formData.time}
                </p>
                <p className="text-[#F5F3E7]/70 text-sm">
                  <span className="text-[#F5F3E7]">Guests:</span> {formData.guests}
                </p>
                <p className="text-[#CCFF00] font-bold mt-2">
                  Total: ${totalPrice.toFixed(2)}
                </p>
              </div>

              <button
                onClick={handleClose}
                className="w-full mt-6 py-3 bg-[#CCFF00] text-[#0A0A0A] font-bold rounded-lg"
              >
                Done
              </button>
            </div>
          ) : step === 1 ? (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#F5F3E7]">Select Date & Time</h3>
              
              <div>
                <label className="block text-sm text-[#F5F3E7]/70 mb-2">Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#F5F3E7]/50" />
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-10 pr-4 py-3 bg-[#F5F3E7]/5 border border-[#F5F3E7]/20 rounded-lg text-[#F5F3E7] focus:outline-none focus:border-[#CCFF00]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#F5F3E7]/70 mb-2">Time</label>
                <div className="grid grid-cols-4 gap-2">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setFormData({ ...formData, time })}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        formData.time === time
                          ? 'bg-[#CCFF00] text-[#0A0A0A]'
                          : 'bg-[#F5F3E7]/5 text-[#F5F3E7]/70 hover:bg-[#F5F3E7]/10'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#F5F3E7]/70 mb-2">Number of Guests</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setFormData({ ...formData, guests: Math.max(1, formData.guests - 1) })}
                    className="w-10 h-10 bg-[#F5F3E7]/5 rounded-lg text-[#F5F3E7] hover:bg-[#F5F3E7]/10 transition-colors flex items-center justify-center"
                  >
                    -
                  </button>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-[#CCFF00]" />
                    <span className="text-xl font-bold text-[#F5F3E7] w-8 text-center">{formData.guests}</span>
                  </div>
                  <button
                    onClick={() => setFormData({ ...formData, guests: Math.min(selectedTour.max_guests, formData.guests + 1) })}
                    className="w-10 h-10 bg-[#F5F3E7]/5 rounded-lg text-[#F5F3E7] hover:bg-[#F5F3E7]/10 transition-colors flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
                <p className="text-xs text-[#F5F3E7]/50 mt-1">Max {selectedTour.max_guests} guests</p>
              </div>

              <div className="bg-[#1B4332]/30 rounded-xl p-4 mt-6">
                <div className="flex justify-between items-center">
                  <span className="text-[#F5F3E7]/70">Total</span>
                  <span className="text-2xl font-bold text-[#CCFF00]">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                disabled={!formData.date}
                className="w-full py-3 bg-[#CCFF00] text-[#0A0A0A] font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#9EFF00] transition-colors"
              >
                Continue
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-[#F5F3E7]">Your Details</h3>
              
              <div>
                <label className="block text-sm text-[#F5F3E7]/70 mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F5F3E7]/5 border border-[#F5F3E7]/20 rounded-lg text-[#F5F3E7] focus:outline-none focus:border-[#CCFF00]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-[#F5F3E7]/70 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F5F3E7]/5 border border-[#F5F3E7]/20 rounded-lg text-[#F5F3E7] focus:outline-none focus:border-[#CCFF00]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-[#F5F3E7]/70 mb-2">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F5F3E7]/5 border border-[#F5F3E7]/20 rounded-lg text-[#F5F3E7] focus:outline-none focus:border-[#CCFF00]"
                />
              </div>

              <div>
                <label className="block text-sm text-[#F5F3E7]/70 mb-2">Special Requests (Optional)</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-3 bg-[#F5F3E7]/5 border border-[#F5F3E7]/20 rounded-lg text-[#F5F3E7] focus:outline-none focus:border-[#CCFF00] resize-none"
                />
              </div>

              <div className="bg-[#1B4332]/30 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[#F5F3E7]/70">{selectedTour.name}</span>
                  <span className="text-[#F5F3E7]">{formData.date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#F5F3E7]/70">{formData.guests} guests × ${selectedTour.price}</span>
                  <span className="text-xl font-bold text-[#CCFF00]">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 bg-[#F5F3E7]/10 text-[#F5F3E7] font-medium rounded-lg hover:bg-[#F5F3E7]/20 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.email || isLoading}
                  className="flex-1 py-3 bg-[#CCFF00] text-[#0A0A0A] font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#9EFF00] transition-colors flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-[#0A0A0A]/30 border-t-[#0A0A0A] rounded-full animate-spin" />
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5" />
                      Book Now
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default BookingModal;
