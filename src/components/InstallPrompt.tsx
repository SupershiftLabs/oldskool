import React, { useState, useEffect } from 'react';
import { X, Download, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(isIOSDevice);

    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) return;

    // Check if user dismissed before
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed) {
      const dismissedDate = new Date(dismissed);
      const daysSinceDismissed = (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) return; // Don't show for 7 days after dismissal
    }

    // Listen for beforeinstallprompt event
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    // Show iOS prompt after delay
    if (isIOSDevice) {
      setTimeout(() => setShowPrompt(true), 3000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setShowPrompt(false);
    }
    
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-dismissed', new Date().toISOString());
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 bg-[#0A0A0A] border border-[#CCFF00]/30 rounded-2xl p-4 shadow-xl z-50 animate-in slide-in-from-bottom-4">
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 p-1 text-[#F5F3E7]/50 hover:text-[#F5F3E7]"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-[#CCFF00] to-[#1B4332] rounded-xl flex items-center justify-center flex-shrink-0">
          <Smartphone className="w-6 h-6 text-[#0A0A0A]" />
        </div>
        
        <div className="flex-1">
          <h3 className="text-[#F5F3E7] font-bold mb-1">Install Old Skool</h3>
          <p className="text-[#F5F3E7]/60 text-sm mb-3">
            {isIOS 
              ? 'Tap the share button and "Add to Home Screen" for the best experience.'
              : 'Install our app for quick access to bookings, tickets, and exclusive deals.'}
          </p>
          
          {!isIOS && deferredPrompt && (
            <button
              onClick={handleInstall}
              className="w-full py-2.5 bg-[#CCFF00] text-[#0A0A0A] font-semibold rounded-lg flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Install App
            </button>
          )}
          
          {isIOS && (
            <div className="flex items-center gap-2 text-[#CCFF00] text-sm">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
              </svg>
              <span>Tap Share → Add to Home Screen</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;
