import { useState } from 'react';
import GiftManager from '../gifts/GiftManager';

export default function AppRouter() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <div>
      <nav style={{ padding: '10px', display: 'flex', gap: '10px' }}>
        <button onClick={() => setCurrentView('home')}>Inicio</button>
        <button onClick={() => setCurrentView('gifts')}>Regalos</button>
      </nav>
      {currentView === 'gifts' && <GiftManager />}
      {currentView === 'home' && <h1>Bienvenido a Majito Cake</h1>}
    </div>
  );
}
