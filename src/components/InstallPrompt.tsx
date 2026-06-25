import { useEffect, useState } from 'react';

export const InstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsVisible(true);
    };

    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsVisible(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div style={{ position: 'fixed', bottom: '20px', left: '20px', right: '20px', backgroundColor: '#fff2e6', padding: '20px', borderRadius: '15px', border: '1px solid #ff6b81', zIndex: 9999, textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
      <p style={{ color: '#6d4c41', marginBottom: '15px', fontSize: '16px' }}>¿Quieres instalar Majito Cake?</p>
      <button 
        onClick={handleInstall} 
        style={{ backgroundColor: '#ff6b81', color: 'white', padding: '10px 25px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}
      >
        Instalar App
      </button>
    </div>
  );
};