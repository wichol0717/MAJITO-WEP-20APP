import { useState } from 'react';

interface UpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCandle: () => void;
  updateQuantity: (id: number, delta: number) => void;
  productos: any[];
  quantities: Record<number, number>;
}

export const UpsellModal = ({ 
  isOpen, 
  onClose, 
  onAddCandle, 
  updateQuantity, 
  productos, 
  quantities 
}: UpsellModalProps) => {
  const [view, setView] = useState<'main' | 'category'>('main');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categorias = Array.from(new Set(productos.map(p => p.categoria)));

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 242, 230, 0.95)', zIndex: 5000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div style={{ backgroundColor: 'var(--color-sunset)', padding: '25px', borderRadius: '30px', border: '1.5px solid var(--color-pink)', width: '100%', maxWidth: '350px', textAlign: 'center', maxHeight: '80vh', overflowY: 'auto' }}>
        {view === 'main' ? (
          <>
            <h2 style={{ color: 'var(--color-pink)', margin: '0 0 20px 0' }}>¿Quieres agregar algo especial?</h2>
            <button onClick={() => { onAddCandle(); onClose(); }} style={{ width: '100%', margin: '5px 0 20px 0', padding: '12px', borderRadius: '10px', border: '1px solid var(--color-pink)', background: 'white', cursor: 'pointer', color: 'var(--color-mocha)' }}>🕯️ Agregar Vela (+ $50)</button>
            <p style={{ color: 'var(--color-mocha)', margin: '0 0 10px 0', fontSize: '14px' }}>O explora por categorías:</p>
            {categorias.map((cat) => (
              <button key={cat} onClick={() => { setSelectedCategory(cat); setView('category'); }} style={{ width: '100%', margin: '5px 0', padding: '12px', borderRadius: '10px', border: '1px solid var(--color-pink)', background: 'white', cursor: 'pointer', color: 'var(--color-mocha)' }}>{cat}</button>
            ))}
          </>
        ) : (
          <>
            <h2 style={{ color: 'var(--color-pink)', margin: '0 0 20px 0' }}>{selectedCategory}</h2>
            {productos.filter(p => p.categoria === selectedCategory).map((prod) => (
              <div key={prod.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(219, 112, 147, 0.2)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={prod.img} style={{ width: '50px', height: '50px', borderRadius: '10px', objectFit: 'cover' }} alt={prod.nombre} />
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ margin: 0, color: 'var(--color-mocha)', fontSize: '14px', fontWeight: 'bold' }}>{prod.nombre}</p>
                    <p style={{ margin: 0, color: 'var(--color-orange)', fontSize: '12px' }}>${prod.precio}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button onClick={() => updateQuantity(prod.id, -1)} style={{ backgroundColor: 'var(--color-crema)', border: 'none', color: 'var(--color-mocha)', borderRadius: '5px', width: '30px', height: '30px', cursor: 'pointer', fontWeight: 'bold' }}>-</button>
                  <span style={{ color: 'var(--color-mocha)', fontWeight: 'bold', width: '20px', textAlign: 'center' }}>{quantities[prod.id] || 0}</span>
                  <button onClick={() => updateQuantity(prod.id, 1)} style={{ backgroundColor: 'var(--color-crema)', border: 'none', color: 'var(--color-mocha)', borderRadius: '5px', width: '30px', height: '30px', cursor: 'pointer', fontWeight: 'bold' }}>+</button>
                </div>
              </div>
            ))}
            <button onClick={() => setView('main')} style={{ width: '100%', marginTop: '20px', background: 'none', border: 'none', color: 'var(--color-pink)', cursor: 'pointer', textDecoration: 'underline' }}>← Volver</button>
          </>
        )}
        {view === 'main' && (
          <button onClick={onClose} style={{ width: '100%', marginTop: '15px', background: 'none', border: 'none', color: 'var(--color-orange)', cursor: 'pointer', textDecoration: 'underline' }}>Cerrar</button>
        )}
      </div>
    </div>
  );
};