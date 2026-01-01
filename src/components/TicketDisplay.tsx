import React from 'react';
import { generateQRCodeSVG, svgToDataURL, generateTicketQRData } from '@/lib/qrcode';
import { Bus, Calendar, Clock, Users, MapPin } from 'lucide-react';

interface TicketDisplayProps {
  ticketCode: string;
  tourName: string;
  date: string;
  time: string;
  guests: number;
  guestName: string;
  status: 'valid' | 'used' | 'expired' | 'cancelled';
}

const TicketDisplay: React.FC<TicketDisplayProps> = ({
  ticketCode,
  tourName,
  date,
  time,
  guests,
  guestName,
  status,
}) => {
  const qrData = generateTicketQRData(ticketCode);
  const qrSvg = generateQRCodeSVG(qrData, 150);
  const qrDataUrl = svgToDataURL(qrSvg);

  const statusColors = {
    valid: 'bg-green-500/20 text-green-400 border-green-500/30',
    used: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    expired: 'bg-red-500/20 text-red-400 border-red-500/30',
    cancelled: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
  };

  return (
    <div className="bg-[#F5F3E7] rounded-2xl overflow-hidden max-w-sm mx-auto shadow-xl">
      {/* Header */}
      <div className="bg-[#0A0A0A] p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#CCFF00] to-[#1B4332] rounded-lg flex items-center justify-center">
            <Bus className="w-6 h-6 text-[#0A0A0A]" />
          </div>
          <div>
            <h3 className="text-[#F5F3E7] font-bold text-sm">OLD SKOOL</h3>
            <p className="text-[#CCFF00] text-[10px] tracking-wider">TOURS & TRANSFERS</p>
          </div>
        </div>
        <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${statusColors[status]}`}>
          {status.toUpperCase()}
        </span>
      </div>

      {/* Ticket Body */}
      <div className="p-6">
        <h2 className="text-[#0A0A0A] text-xl font-bold mb-4">{tourName}</h2>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 text-[#0A0A0A]/70">
            <Calendar className="w-5 h-5" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-3 text-[#0A0A0A]/70">
            <Clock className="w-5 h-5" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-3 text-[#0A0A0A]/70">
            <Users className="w-5 h-5" />
            <span>{guests} {guests === 1 ? 'Guest' : 'Guests'}</span>
          </div>
          <div className="flex items-center gap-3 text-[#0A0A0A]/70">
            <MapPin className="w-5 h-5" />
            <span>123 Retro Lane, Downtown</span>
          </div>
        </div>

        {/* Dashed Line */}
        <div className="relative py-4">
          <div className="absolute left-0 right-0 top-1/2 border-t-2 border-dashed border-[#0A0A0A]/20" />
          <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#0A0A0A] rounded-full" />
          <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#0A0A0A] rounded-full" />
        </div>

        {/* QR Code Section */}
        <div className="text-center">
          <div className="inline-block bg-white p-3 rounded-xl shadow-inner mb-3">
            <img src={qrDataUrl} alt="Ticket QR Code" className="w-36 h-36" />
          </div>
          <p className="text-[#0A0A0A] font-mono text-sm font-bold">{ticketCode}</p>
          <p className="text-[#0A0A0A]/50 text-xs mt-1">Scan at boarding</p>
        </div>

        {/* Guest Name */}
        <div className="mt-6 pt-4 border-t border-[#0A0A0A]/10">
          <p className="text-[#0A0A0A]/50 text-xs uppercase tracking-wider">Guest Name</p>
          <p className="text-[#0A0A0A] font-semibold">{guestName}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#1B4332] p-3 text-center">
        <p className="text-[#F5F3E7]/70 text-xs">
          Present this ticket at boarding • Save to your wallet
        </p>
      </div>
    </div>
  );
};

export default TicketDisplay;
