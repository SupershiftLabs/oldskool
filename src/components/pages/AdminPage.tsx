import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Booking, Ticket, MerchOrder, ContactMessage } from '@/types';
import { 
  LayoutDashboard, Calendar, Ticket as TicketIcon, ShoppingBag, 
  MessageSquare, Download, Check, X, QrCode, Search, RefreshCw,
  Eye, ChevronDown
} from 'lucide-react';
import { toast } from 'sonner';

type TabType = 'overview' | 'bookings' | 'tickets' | 'orders' | 'messages';

const AdminPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [orders, setOrders] = useState<MerchOrder[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [scanCode, setScanCode] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [bookingsRes, ticketsRes, ordersRes, messagesRes] = await Promise.all([
        supabase.from('bookings').select('*, tour:tours(*), customer:customers(*)').order('created_at', { ascending: false }),
        supabase.from('tickets').select('*, booking:bookings(*, tour:tours(*))').order('created_at', { ascending: false }),
        supabase.from('merch_orders').select('*').order('created_at', { ascending: false }),
        supabase.from('contact_messages').select('*').order('created_at', { ascending: false }),
      ]);

      if (bookingsRes.data) setBookings(bookingsRes.data);
      if (ticketsRes.data) setTickets(ticketsRes.data);
      if (ordersRes.data) setOrders(ordersRes.data);
      if (messagesRes.data) setMessages(messagesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleScanTicket = async () => {
    if (!scanCode.trim()) {
      toast.error('Please enter a ticket code');
      return;
    }

    try {
      const { data: ticket, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('qr_code', scanCode.trim())
        .single();

      if (error || !ticket) {
        toast.error('Ticket not found');
        return;
      }

      if (ticket.status === 'used') {
        toast.error('Ticket already used!', {
          description: `Scanned at ${new Date(ticket.scanned_at).toLocaleString()}`,
        });
        return;
      }

      if (ticket.status === 'expired' || ticket.status === 'cancelled') {
        toast.error(`Ticket is ${ticket.status}`);
        return;
      }

      // Mark ticket as used
      const { error: updateError } = await supabase
        .from('tickets')
        .update({ status: 'used', scanned_at: new Date().toISOString() })
        .eq('id', ticket.id);

      if (updateError) throw updateError;

      toast.success('Ticket validated!', {
        description: `Guest: ${ticket.guest_name}`,
      });

      setScanCode('');
      fetchData();
    } catch (error) {
      console.error('Error scanning ticket:', error);
      toast.error('Failed to validate ticket');
    }
  };

  const exportToCSV = (data: any[], filename: string) => {
    const headers = Object.keys(data[0] || {}).join(',');
    const rows = data.map(row => 
      Object.values(row).map(val => 
        typeof val === 'object' ? JSON.stringify(val) : val
      ).join(',')
    ).join('\n');
    
    const csv = `${headers}\n${rows}`;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'bookings', label: 'Bookings', icon: Calendar, count: bookings.length },
    { id: 'tickets', label: 'Tickets', icon: TicketIcon, count: tickets.length },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, count: orders.length },
    { id: 'messages', label: 'Messages', icon: MessageSquare, count: messages.filter(m => !m.is_read).length },
  ];

  const stats = [
    { label: 'Total Bookings', value: bookings.length, color: 'text-[#CCFF00]' },
    { label: 'Active Tickets', value: tickets.filter(t => t.status === 'valid').length, color: 'text-green-400' },
    { label: 'Merch Orders', value: orders.length, color: 'text-blue-400' },
    { label: 'Unread Messages', value: messages.filter(m => !m.is_read).length, color: 'text-orange-400' },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#F5F3E7]">Admin Dashboard</h1>
            <p className="text-[#F5F3E7]/60 mt-1">Manage bookings, tickets, and orders</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setScannerOpen(!scannerOpen)}
              className="px-4 py-2 bg-[#CCFF00] text-[#0A0A0A] font-semibold rounded-lg flex items-center gap-2"
            >
              <QrCode className="w-5 h-5" />
              Scan Ticket
            </button>
            <button
              onClick={fetchData}
              className="px-4 py-2 bg-[#F5F3E7]/10 text-[#F5F3E7] rounded-lg flex items-center gap-2 hover:bg-[#F5F3E7]/20"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Scanner */}
        {scannerOpen && (
          <div className="mb-8 p-6 bg-[#F5F3E7]/5 rounded-xl border border-[#CCFF00]/30">
            <h3 className="text-lg font-semibold text-[#F5F3E7] mb-4 flex items-center gap-2">
              <QrCode className="w-5 h-5 text-[#CCFF00]" />
              Ticket Scanner
            </h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={scanCode}
                onChange={(e) => setScanCode(e.target.value)}
                placeholder="Enter ticket code (e.g., OST-123456789)"
                className="flex-1 px-4 py-3 bg-[#0A0A0A] border border-[#F5F3E7]/20 rounded-lg text-[#F5F3E7] focus:outline-none focus:border-[#CCFF00]"
                onKeyDown={(e) => e.key === 'Enter' && handleScanTicket()}
              />
              <button
                onClick={handleScanTicket}
                className="px-6 py-3 bg-[#CCFF00] text-[#0A0A0A] font-semibold rounded-lg"
              >
                Validate
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap flex items-center gap-2 transition-all ${
                activeTab === tab.id
                  ? 'bg-[#CCFF00] text-[#0A0A0A]'
                  : 'bg-[#F5F3E7]/10 text-[#F5F3E7]/70 hover:bg-[#F5F3E7]/20'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                  activeTab === tab.id ? 'bg-[#0A0A0A]/20' : 'bg-[#CCFF00] text-[#0A0A0A]'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#CCFF00]/30 border-t-[#CCFF00] rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* Overview */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((stat, i) => (
                    <div key={i} className="p-6 bg-[#F5F3E7]/5 rounded-xl border border-[#F5F3E7]/10">
                      <p className="text-[#F5F3E7]/60 text-sm">{stat.label}</p>
                      <p className={`text-3xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-[#F5F3E7]/5 rounded-xl border border-[#F5F3E7]/10">
                    <h3 className="text-lg font-semibold text-[#F5F3E7] mb-4">Recent Bookings</h3>
                    <div className="space-y-3">
                      {bookings.slice(0, 5).map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-3 bg-[#0A0A0A] rounded-lg">
                          <div>
                            <p className="text-[#F5F3E7] font-medium">{booking.tour?.name || 'Tour'}</p>
                            <p className="text-[#F5F3E7]/50 text-sm">{booking.booking_date}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                            booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 bg-[#F5F3E7]/5 rounded-xl border border-[#F5F3E7]/10">
                    <h3 className="text-lg font-semibold text-[#F5F3E7] mb-4">Recent Messages</h3>
                    <div className="space-y-3">
                      {messages.slice(0, 5).map((msg) => (
                        <div key={msg.id} className="flex items-start gap-3 p-3 bg-[#0A0A0A] rounded-lg">
                          <div className={`w-2 h-2 rounded-full mt-2 ${msg.is_read ? 'bg-[#F5F3E7]/30' : 'bg-[#CCFF00]'}`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-[#F5F3E7] font-medium truncate">{msg.name}</p>
                            <p className="text-[#F5F3E7]/50 text-sm truncate">{msg.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bookings */}
            {activeTab === 'bookings' && (
              <div className="bg-[#F5F3E7]/5 rounded-xl border border-[#F5F3E7]/10 overflow-hidden">
                <div className="p-4 border-b border-[#F5F3E7]/10 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-[#F5F3E7]">All Bookings</h3>
                  <button
                    onClick={() => exportToCSV(bookings, 'bookings')}
                    className="px-3 py-1.5 bg-[#F5F3E7]/10 text-[#F5F3E7] text-sm rounded-lg flex items-center gap-2 hover:bg-[#F5F3E7]/20"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#0A0A0A]">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-[#F5F3E7]/50 uppercase">Tour</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-[#F5F3E7]/50 uppercase">Customer</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-[#F5F3E7]/50 uppercase">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-[#F5F3E7]/50 uppercase">Guests</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-[#F5F3E7]/50 uppercase">Total</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-[#F5F3E7]/50 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F5F3E7]/10">
                      {bookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-[#F5F3E7]/5">
                          <td className="px-4 py-3 text-[#F5F3E7]">{booking.tour?.name || '-'}</td>
                          <td className="px-4 py-3 text-[#F5F3E7]/70">{booking.customer?.name || booking.customer?.email || '-'}</td>
                          <td className="px-4 py-3 text-[#F5F3E7]/70">{booking.booking_date}</td>
                          <td className="px-4 py-3 text-[#F5F3E7]/70">{booking.guests}</td>
                          <td className="px-4 py-3 text-[#CCFF00] font-medium">${booking.total_amount}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                              booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tickets */}
            {activeTab === 'tickets' && (
              <div className="bg-[#F5F3E7]/5 rounded-xl border border-[#F5F3E7]/10 overflow-hidden">
                <div className="p-4 border-b border-[#F5F3E7]/10 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-[#F5F3E7]">All Tickets</h3>
                  <button
                    onClick={() => exportToCSV(tickets, 'tickets')}
                    className="px-3 py-1.5 bg-[#F5F3E7]/10 text-[#F5F3E7] text-sm rounded-lg flex items-center gap-2 hover:bg-[#F5F3E7]/20"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-[#0A0A0A]">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-[#F5F3E7]/50 uppercase">Code</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-[#F5F3E7]/50 uppercase">Guest</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-[#F5F3E7]/50 uppercase">Tour</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-[#F5F3E7]/50 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-[#F5F3E7]/50 uppercase">Scanned</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F5F3E7]/10">
                      {tickets.map((ticket) => (
                        <tr key={ticket.id} className="hover:bg-[#F5F3E7]/5">
                          <td className="px-4 py-3 text-[#CCFF00] font-mono text-sm">{ticket.qr_code}</td>
                          <td className="px-4 py-3 text-[#F5F3E7]">{ticket.guest_name || '-'}</td>
                          <td className="px-4 py-3 text-[#F5F3E7]/70">{ticket.booking?.tour?.name || '-'}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              ticket.status === 'valid' ? 'bg-green-500/20 text-green-400' :
                              ticket.status === 'used' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {ticket.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-[#F5F3E7]/50 text-sm">
                            {ticket.scanned_at ? new Date(ticket.scanned_at).toLocaleString() : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Orders */}
            {activeTab === 'orders' && (
              <div className="bg-[#F5F3E7]/5 rounded-xl border border-[#F5F3E7]/10 overflow-hidden">
                <div className="p-4 border-b border-[#F5F3E7]/10 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-[#F5F3E7]">Merch Orders</h3>
                  <button
                    onClick={() => exportToCSV(orders, 'orders')}
                    className="px-3 py-1.5 bg-[#F5F3E7]/10 text-[#F5F3E7] text-sm rounded-lg flex items-center gap-2 hover:bg-[#F5F3E7]/20"
                  >
                    <Download className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>
                {orders.length === 0 ? (
                  <div className="p-8 text-center text-[#F5F3E7]/50">No orders yet</div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-[#0A0A0A]">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-[#F5F3E7]/50 uppercase">Order ID</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-[#F5F3E7]/50 uppercase">Type</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-[#F5F3E7]/50 uppercase">Total</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-[#F5F3E7]/50 uppercase">Status</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-[#F5F3E7]/50 uppercase">Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F5F3E7]/10">
                        {orders.map((order) => (
                          <tr key={order.id} className="hover:bg-[#F5F3E7]/5">
                            <td className="px-4 py-3 text-[#F5F3E7] font-mono text-sm">{order.id.slice(0, 8)}</td>
                            <td className="px-4 py-3 text-[#F5F3E7]/70 capitalize">{order.order_type}</td>
                            <td className="px-4 py-3 text-[#CCFF00] font-medium">${order.total_amount}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                order.status === 'paid' ? 'bg-green-500/20 text-green-400' :
                                order.status === 'shipped' ? 'bg-blue-500/20 text-blue-400' :
                                order.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-gray-500/20 text-gray-400'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-[#F5F3E7]/50 text-sm">
                              {new Date(order.created_at).toLocaleDateString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Messages */}
            {activeTab === 'messages' && (
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="p-8 text-center text-[#F5F3E7]/50 bg-[#F5F3E7]/5 rounded-xl">No messages yet</div>
                ) : (
                  messages.map((msg) => (
                    <div key={msg.id} className="p-6 bg-[#F5F3E7]/5 rounded-xl border border-[#F5F3E7]/10">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${msg.is_read ? 'bg-[#F5F3E7]/30' : 'bg-[#CCFF00]'}`} />
                          <div>
                            <h4 className="text-[#F5F3E7] font-medium">{msg.name}</h4>
                            <p className="text-[#F5F3E7]/50 text-sm">{msg.email}</p>
                            {msg.phone && <p className="text-[#F5F3E7]/50 text-sm">{msg.phone}</p>}
                          </div>
                        </div>
                        <span className="text-[#F5F3E7]/50 text-sm">
                          {new Date(msg.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="mt-4 pl-5">
                        <span className="px-2 py-1 bg-[#CCFF00]/10 text-[#CCFF00] text-xs rounded capitalize">
                          {msg.subject}
                        </span>
                        <p className="text-[#F5F3E7]/70 mt-2">{msg.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
