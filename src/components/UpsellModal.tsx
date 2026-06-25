import React from 'react';

export const UpsellModal = ({ isOpen, onClose, onAddCandle, onAddGift }) => {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
      <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '12px', width: '90%', maxWidth: '350px', textAlign: 'center' }}>
        <h3>¿Quieres añadir algo especial?</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button onClick={onAddCandle}>🕯️ Añadir vela de festejo</button>
          <button onClick={onAddGift}>🎁 Añadir envoltorio de regalo</button>
          <button onClick={onClose}>Continuar sin extras</button>
        </div>
      </div>
    </div>
  );
};
