import React from 'react';
import { useStore } from '@/store/useStore';
import Header from './Header';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import BookingModal from './BookingModal';
import InstallPrompt from './InstallPrompt';
import HomePage from './pages/HomePage';
import ToursPage from './pages/ToursPage';
import MerchPage from './pages/MerchPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import PartyBusPage from './pages/PartyBusPage';
import AdminPage from './pages/AdminPage';

const AppLayout: React.FC = () => {
  const { activePage } = useStore();

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage />;
      case 'tours':
        return <ToursPage />;
      case 'merch':
        return <MerchPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'contact':
        return <ContactPage />;
      case 'party':
        return <PartyBusPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      <Header />
      <main>
        {renderPage()}
      </main>
      <Footer />
      <CartDrawer />
      <BookingModal />
      <InstallPrompt />
    </div>
  );
};

export default AppLayout;
