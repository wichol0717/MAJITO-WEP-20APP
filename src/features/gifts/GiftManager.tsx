// [Módulo: features/gifts] -> [Archivo: GiftManager.tsx] -> [Acción: CREAR]
import { useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function GiftManager() {
  const [giftData, setGiftData] = useState({
    customer_name: '',
    recipient_name: '',
    delivery_address: '',
    gift_message: '',
    product_id: 1
  });

  const handleSendGift = async () => {
    try {
      const { error } = await supabase
        .from('gift_orders')
        .insert([giftData]);

      if (error) throw error;
      alert('¡Regalo registrado con éxito!');
    } catch (error) {
      console.error('Error:', error);
      alert('Hubo un error al registrar el regalo.');
    }
  };

  return (
    <div style={{ padding: '20px', color: '#d9b88f', maxWidth: '400px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Enviar un Regalo</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input className="majito-input" placeholder="Tu Nombre" onChange={(e) => setGiftData({...giftData, customer_name: e.target.value})} />
        <input className="majito-input" placeholder="Nombre del Festejado" onChange={(e) => setGiftData({...giftData, recipient_name: e.target.value})} />
        <input className="majito-input" placeholder="Dirección de entrega" onChange={(e) => setGiftData({...giftData, delivery_address: e.target.value})} />
        <textarea className="majito-input" placeholder="Mensaje de la tarjeta" onChange={(e) => setGiftData({...giftData, gift_message: e.target.value})} />
        <button onClick={handleSendGift} style={{ backgroundColor: '#d9b88f', color: '#000', border: 'none', padding: '15px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' }}>Confirmar Regalo</button>
      </div>
    </div>
  );
}
