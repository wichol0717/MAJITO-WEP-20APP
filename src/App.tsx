import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { InstallPrompt } from './components/InstallPrompt';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  img: string;
  categoria: string;
  descripcion: string;
}

interface UpsellModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVela: () => void;
  updateQuantity: (id: number, delta: number) => void;
  productos: Producto[];
  quantities: Record<number, number>;
}

const UpsellModal = ({ isOpen, onClose, onAddVela, updateQuantity, productos, quantities }: UpsellModalProps) => {
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
            <button onClick={() => { onAddVela(); onClose(); }} style={{ width: '100%', margin: '5px 0 20px 0', padding: '12px', borderRadius: '10px', border: '1px solid var(--color-pink)', background: 'white', cursor: 'pointer', color: 'var(--color-mocha)' }}>🕯️ Agregar Vela (+ $50)</button>
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

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('Todos');
  const [quantities, setQuantities] = useState<Record<number, number>>({});
  const [selectedProduct, setSelectedProduct] = useState<Producto | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isUpsellOpen, setIsUpsellOpen] = useState<boolean>(false);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [currentDateView, setCurrentDateView] = useState<Date>(new Date());
  const [buyerName, setBuyerName] = useState<string>("");
  const [buyerPhone, setBuyerPhone] = useState<string>("");
  const [buyerAddress, setBuyerAddress] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [honoreeName, setHonoreeName] = useState<string>("");
  const [honoreePhone, setHonoreePhone] = useState<string>("");
  const [honoreeAddress, setHonoreeAddress] = useState<string>("");
  const [bookingData, setBookingData] = useState<{date: string, package: string}>({ date: '', package: '' });
  const [giftProduct, setGiftProduct] = useState<Producto | null>(null);
  const [giftQuantity, setGiftQuantity] = useState<number>(1);

  const productos: Producto[] = [
    { id: 1, nombre: 'Triple Chocolate', precio: 450, img: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80', categoria: 'Pasteles', descripcion: 'Delicioso pastel con tres capas de chocolate amargo, leche y blanco.' },
    { id: 2, nombre: 'Sea Salt', precio: 50, img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&q=80', categoria: 'Cupcakes', descripcion: 'Cupcake suave con un toque de sal marina y caramelo artesanal.' },
    { id: 3, nombre: 'Walnut Chip', precio: 420, img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80', categoria: 'Pasteles', descripcion: 'Pastel esponjoso con trozos de nuez y chispas de chocolate premium.' },
    { id: 4, nombre: 'Peanut Butter', precio: 35, img: 'https://images.unsplash.com/photo-1509482560494-4126f8249959?w=400&q=80', categoria: 'Galletas', descripcion: 'Galleta crujiente de mantequilla de maní hecha al horno tradicional.' }
  ];

  const categorias = ['Todos', 'Pasteles', 'Cupcakes', 'Galletas'];
  const totalItems = Object.values(quantities).reduce((acc, curr) => acc + curr, 0);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const days = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    return { days, firstDay };
  };

  const { days, firstDay } = getDaysInMonth(currentDateView);

  const updateQuantity = (id: number, delta: number) => {
    setQuantities(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) }));
  };

  const productosFiltrados = activeTab === 'Todos' ? productos : productos.filter(p => p.categoria === activeTab);
  const productosEnCarrito = productos.filter(p => (quantities[p.id] || 0) > 0);
  const montoTotal = productosEnCarrito.reduce((acc, item) => acc + (item.precio * quantities[item.id]), 0);

  const closeBooking = () => {
    setIsBookingOpen(false);
    setActiveTab('Todos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-crema)', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0 120px 0' }}>
      <style>
        {`
          .majito-input { padding: 12px; border-radius: 8px; border: 1px solid var(--color-mocha); background: transparent !important; color: var(--color-mocha) !important; width: 100%; box-sizing: border-box; font-family: sans-serif; appearance: none; }
          .majito-input::placeholder { color: var(--color-mocha); opacity: 0.6; }
          select.majito-input { appearance: auto !important; cursor: pointer; color-scheme: light; }
        `}
      </style>
      
      <div style={{ width: '90%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <h1 style={{ color: 'var(--color-pink)', fontSize: '36px', fontFamily: 'serif', margin: 0 }}>Majito Cake</h1>
          <p style={{ color: 'var(--color-mocha)', fontSize: '16px', fontStyle: 'italic', margin: 0 }}>Horneando sueños</p>
        </div>
        <button onClick={() => setIsBookingOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
           <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-pink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
           <span style={{ color: 'var(--color-pink)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>eventos</span>
        </button>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '40px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {categorias.map((cat) => (
          <button key={cat} onClick={() => setActiveTab(cat)} style={{ backgroundColor: activeTab === cat ? 'var(--color-pink)' : 'transparent', color: activeTab === cat ? 'var(--color-crema)' : 'var(--color-mocha)', border: '1.5px solid var(--color-pink)', borderRadius: '20px', padding: '6px 16px', fontSize: '14px', cursor: 'pointer', transition: 'all 0.3s' }}>{cat}</button>
        ))}
      </div>

      {[0, 2].map((startIndex) => {
        const fila = productosFiltrados.slice(startIndex, startIndex + 2);
        if (fila.length === 0) return null;
        return (
          <div key={startIndex} style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px', width: '90%' }}>
            {fila.map((item) => (
              <div key={item.id} style={{ position: 'relative', width: '42%', aspectRatio: '3/6', border: '1.5px solid var(--color-pink)', borderRadius: '30px', backgroundColor: 'var(--color-sunset)', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <button onClick={() => { setGiftProduct(item); setGiftQuantity(1); }} style={{ position: 'absolute', top: '10px', left: '10px', background: 'none', border: 'none', cursor: 'pointer', zIndex: 10 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-pink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"></rect><path d="M7 8v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V8"></path><path d="M12 8v12"></path><path d="M16 4h-4a2 2 0 0 0-2 2v2"></path><path d="M8 4h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
                <div style={{ flex: '2', padding: '8px', display: 'flex' }}>
                  <div style={{ width: '100%', height: '100%', border: '1px solid var(--color-pink)', borderRadius: '22px', overflow: 'hidden' }}><img src={item.img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={item.nombre} /></div>
                </div>
                <div style={{ padding: '8px', textAlign: 'center' }}><p style={{ color: 'var(--color-mocha)', margin: '0', fontSize: '14px', fontWeight: 'bold' }}>{item.nombre}</p></div>
                <div style={{ paddingBottom: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <button onClick={() => updateQuantity(item.id, -1)} style={{ backgroundColor: 'var(--color-crema)', border: 'none', color: 'var(--color-mocha)', borderRadius: '5px', width: '25px', height: '25px', cursor: 'pointer' }}>-</button>
                    <span style={{ color: 'var(--color-mocha)', fontWeight: 'bold', width: '20px', textAlign: 'center' }}>{quantities[item.id] || 0}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} style={{ backgroundColor: 'var(--color-crema)', border: 'none', color: 'var(--color-mocha)', borderRadius: '5px', width: '25px', height: '25px', cursor: 'pointer' }}>+</button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '5px' }}><button onClick={() => setSelectedProduct(item)} style={{ backgroundColor: 'var(--color-pink)', color: 'var(--color-crema)', border: 'none', borderRadius: '8px', padding: '4px 20px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>Ver</button></div>
                </div>
              </div>
            ))}
          </div>
        );
      })}

      {giftProduct && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 242, 230, 0.95)', zIndex: 4000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', overflowY: 'auto' }}>
          <div style={{ backgroundColor: 'var(--color-sunset)', padding: '20px', borderRadius: '30px', border: '1.5px solid var(--color-pink)', width: '100%', maxWidth: '350px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h2 style={{ color: 'var(--color-pink)', textAlign: 'center', margin: 0 }}>Regalar {giftProduct.nombre}</h2>
            <input className="majito-input" placeholder="Tu Nombre" value={buyerName} onChange={(e: ChangeEvent<HTMLInputElement>) => setBuyerName(e.target.value)} />
            <input className="majito-input" placeholder="Tu WhatsApp" value={buyerPhone} onChange={(e: ChangeEvent<HTMLInputElement>) => setBuyerPhone(e.target.value)} />
            <input className="majito-input" placeholder="Nombre del Festejado" value={honoreeName} onChange={(e: ChangeEvent<HTMLInputElement>) => setHonoreeName(e.target.value)} />
            <input className="majito-input" placeholder="WhatsApp del Festejado" value={honoreePhone} onChange={(e: ChangeEvent<HTMLInputElement>) => setHonoreePhone(e.target.value)} />
            <input className="majito-input" placeholder="Dirección de Entrega" value={buyerAddress} onChange={(e: ChangeEvent<HTMLInputElement>) => setBuyerAddress(e.target.value)} />
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', margin: '15px 0' }}>
              <button onClick={() => setGiftQuantity(Math.max(1, giftQuantity - 1))} style={{ backgroundColor: 'var(--color-crema)', border: 'none', color: 'var(--color-mocha)', borderRadius: '8px', width: '40px', height: '40px', cursor: 'pointer', fontSize: '20px' }}>-</button>
              <span style={{ color: 'var(--color-mocha)', fontSize: '20px', fontWeight: 'bold', minWidth: '30px', textAlign: 'center' }}>{giftQuantity}</span>
              <button onClick={() => setGiftQuantity(giftQuantity + 1)} style={{ backgroundColor: 'var(--color-crema)', border: 'none', color: 'var(--color-mocha)', borderRadius: '8px', width: '40px', height: '40px', cursor: 'pointer', fontSize: '20px' }}>+</button>
            </div>
            <button onClick={() => { updateQuantity(giftProduct.id, giftQuantity); setGiftProduct(null); }} style={{ backgroundColor: 'var(--color-pink)', color: 'var(--color-crema)', border: 'none', borderRadius: '10px', padding: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Agregar al Carrito</button>
            <button onClick={() => setGiftProduct(null)} style={{ background: 'none', border: 'none', color: 'var(--color-orange)', cursor: 'pointer' }}>Cancelar</button>
          </div>
        </div>
      )}

      {isBookingOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 242, 230, 0.95)', zIndex: 4000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', overflowY: 'auto' }}>
          <div style={{ backgroundColor: 'var(--color-sunset)', padding: '20px', borderRadius: '30px', border: '1.5px solid var(--color-pink)', width: '100%', maxWidth: '350px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h2 style={{ color: 'var(--color-pink)', textAlign: 'center', margin: 0 }}>Reservar Evento</h2>
            <input className="majito-input" placeholder="Nombre" value={buyerName} onChange={(e: ChangeEvent<HTMLInputElement>) => setBuyerName(e.target.value)} />
            <input className="majito-input" placeholder="Tu WhatsApp" value={buyerPhone} onChange={(e: ChangeEvent<HTMLInputElement>) => setBuyerPhone(e.target.value)} />
            <input className="majito-input" placeholder="Dirección del lugar" value={honoreeAddress} onChange={(e: ChangeEvent<HTMLInputElement>) => setHonoreeAddress(e.target.value)} />
            <select className="majito-input" value={bookingData.package} onChange={(e: ChangeEvent<HTMLSelectElement>) => setBookingData({...bookingData, package: e.target.value})}>
              <option value="" disabled style={{background: 'var(--color-sunset)', color: 'var(--color-mocha)'}}>Selecciona paquete</option>
              <option value="50" style={{background: 'var(--color-sunset)', color: 'var(--color-mocha)'}}>Paquete 1: 50 personas</option>
              <option value="100" style={{background: 'var(--color-sunset)', color: 'var(--color-mocha)'}}>Paquete 2: 100 personas</option>
              <option value="150" style={{background: 'var(--color-sunset)', color: 'var(--color-mocha)'}}>Paquete 3: 150 personas</option>
            </select>
            <div style={{ color: 'var(--color-mocha)', fontSize: '12px', padding: '10px 0' }}>
                <label>Selecciona fecha:</label>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', marginTop: '10px' }}>
                    <button onClick={() => setCurrentDateView(new Date(currentDateView.setMonth(currentDateView.getMonth() - 1)))} style={{ background: 'none', border: 'none', color: 'var(--color-pink)', cursor: 'pointer' }}>◀</button>
                    <span>{currentDateView.toLocaleString('es-ES', { month: 'long', year: 'numeric' })}</span>
                    <button onClick={() => setCurrentDateView(new Date(currentDateView.setMonth(currentDateView.getMonth() + 1)))} style={{ background: 'none', border: 'none', color: 'var(--color-pink)', cursor: 'pointer' }}>▶</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
                    {['Do','Lu','Ma','Mi','Ju','Vi','Sa'].map(d => <div key={d} style={{ textAlign: 'center', fontWeight: 'bold' }}>{d}</div>)}
                    {Array.from({ length: firstDay }).map((_, i) => <div key={`empty-${i}`} />)}
                    {Array.from({ length: days }).map((_, i) => (
                        <button key={i} onClick={() => setBookingData({...bookingData, date: `${i + 1}/${currentDateView.getMonth() + 1}/${currentDateView.getFullYear()}`})} style={{ background: bookingData.date === `${i + 1}/${currentDateView.getMonth() + 1}/${currentDateView.getFullYear()}` ? 'var(--color-pink)' : 'transparent', color: bookingData.date === `${i + 1}/${currentDateView.getMonth() + 1}/${currentDateView.getFullYear()}` ? 'var(--color-crema)' : 'var(--color-mocha)', border: 'none', borderRadius: '50%', padding: '5px', cursor: 'pointer' }}>
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
            <button onClick={closeBooking} style={{ backgroundColor: 'var(--color-pink)', color: 'var(--color-crema)', border: 'none', borderRadius: '10px', padding: '12px', fontWeight: 'bold', cursor: 'pointer' }}>Confirmar Reserva</button>
            <button onClick={closeBooking} style={{ background: 'none', border: 'none', color: 'var(--color-orange)', cursor: 'pointer' }}>Cerrar</button>
          </div>
        </div>
      )}

      {selectedProduct && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 242, 230, 0.9)', backdropFilter: 'blur(5px)', zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
          <div style={{ position: 'relative', backgroundColor: 'var(--color-sunset)', padding: '25px', borderRadius: '30px', border: '1.5px solid var(--color-pink)', width: '90%', maxWidth: '350px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', maxHeight: '90vh', overflowY: 'auto' }}>
            <img src={selectedProduct.img} style={{ width: '100%', height: '150px', borderRadius: '20px', marginBottom: '20px', objectFit: 'cover' }} alt={selectedProduct.nombre} />
            <h2 style={{ color: 'var(--color-pink)', margin: '0 0 10px 0', fontSize: '20px' }}>{selectedProduct.nombre}</h2>
            <p style={{ color: 'var(--color-mocha)', fontSize: '14px', marginBottom: '15px', lineHeight: '1.4' }}>{selectedProduct.descripcion}</p>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px', marginBottom: '10px' }}>
                    <button onClick={() => updateQuantity(selectedProduct.id, -1)} style={{ backgroundColor: 'var(--color-crema)', border: 'none', color: 'var(--color-mocha)', borderRadius: '8px', width: '40px', height: '40px', cursor: 'pointer', fontSize: '20px' }}>-</button>
                    <span style={{ color: 'var(--color-mocha)', fontSize: '20px', fontWeight: 'bold', minWidth: '30px' }}>{quantities[selectedProduct.id] || 0}</span>
                    <button onClick={() => updateQuantity(selectedProduct.id, 1)} style={{ backgroundColor: 'var(--color-crema)', border: 'none', color: 'var(--color-mocha)', borderRadius: '8px', width: '40px', height: '40px', cursor: 'pointer', fontSize: '20px' }}>+</button>
                </div>
            </div>
            <button onClick={() => setSelectedProduct(null)} style={{ backgroundColor: 'var(--color-pink)', color: 'var(--color-crema)', border: 'none', borderRadius: '10px', padding: '10px 25px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px', width: '100%' }}>Aceptar</button>
            <button onClick={() => setSelectedProduct(null)} style={{ background: 'none', border: 'none', color: 'var(--color-orange)', marginTop: '10px', cursor: 'pointer' }}>Cerrar</button>
          </div>
        </div>
      )}

      {isCartOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 242, 230, 0.95)', zIndex: 3000, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', overflowY: 'auto' }}>
          <div style={{ backgroundColor: 'var(--color-sunset)', padding: '25px', borderRadius: '30px', border: '1.5px solid var(--color-pink)', width: '100%', maxWidth: '350px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <h2 style={{ color: 'var(--color-pink)', textAlign: 'center', margin: 0 }}>Finalizar Compra</h2>
            <input className="majito-input" placeholder="Nombre del Comprador" value={buyerName} onChange={(e: ChangeEvent<HTMLInputElement>) => setBuyerName(e.target.value)} />
            <input className="majito-input" placeholder="WhatsApp" value={buyerPhone} onChange={(e: ChangeEvent<HTMLInputElement>) => setBuyerPhone(e.target.value)} />
            <input className="majito-input" placeholder="Dirección del lugar" value={honoreeAddress} onChange={(e: ChangeEvent<HTMLInputElement>) => setHonoreeAddress(e.target.value)} />
            <select className="majito-input" value={paymentMethod} onChange={(e: ChangeEvent<HTMLSelectElement>) => setPaymentMethod(e.target.value)}>
              <option value="" disabled style={{background: 'var(--color-sunset)', color: 'var(--color-mocha)'}}>Tipo de Pago</option>
              <option value="transferencia" style={{background: 'var(--color-sunset)', color: 'var(--color-mocha)'}}>Transferencia Bancaria</option>
              <option value="efectivo" style={{background: 'var(--color-sunset)', color: 'var(--color-mocha)'}}>Efectivo</option>
              <option value="oxxo" style={{background: 'var(--color-sunset)', color: 'var(--color-mocha)'}}>Oxxo (ICOS)</option>
            </select>
            <div style={{ maxHeight: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px', paddingRight: '5px' }}>
              {productosEnCarrito.length === 0 ? <p style={{ color: 'var(--color-mocha)', textAlign: 'center' }}>Carrito vacío</p> : productosEnCarrito.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-crema)', paddingBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={item.img} style={{ width: '45px', height: '45px', borderRadius: '10px', objectFit: 'cover' }} alt={item.nombre} />
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ color: 'var(--color-mocha)', fontSize: '13px', fontWeight: 'bold' }}>{item.nombre}</span>
                      <span style={{ color: 'var(--color-orange)', fontSize: '12px' }}>${item.precio * quantities[item.id]}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button onClick={() => updateQuantity(item.id, -1)} style={{ backgroundColor: 'var(--color-crema)', border: 'none', color: 'var(--color-mocha)', borderRadius: '5px', width: '30px', height: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>-</button>
                    <span style={{ color: 'var(--color-mocha)', fontWeight: 'bold', width: '20px', textAlign: 'center', fontSize: '14px' }}>{quantities[item.id]}</span>
                    <button onClick={() => updateQuantity(item.id, 1)} style={{ backgroundColor: 'var(--color-crema)', border: 'none', color: 'var(--color-mocha)', borderRadius: '5px', width: '30px', height: '30px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>+</button>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', borderTop: '1px solid var(--color-pink)', paddingTop: '15px', marginTop: '5px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-mocha)', fontSize: '14px' }}>
                <span>Total de Productos:</span>
                <span style={{ fontWeight: 'bold', color: 'var(--color-pink)' }}>{totalItems}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--color-mocha)', fontSize: '16px', fontWeight: 'bold' }}>
                <span>Monto Final:</span>
                <span style={{ color: 'var(--color-orange)' }}>${montoTotal}</span>
              </div>
            </div>
            <button onClick={() => { setIsCartOpen(false); setIsUpsellOpen(true); }} style={{ backgroundColor: 'var(--color-pink)', color: 'var(--color-crema)', border: 'none', borderRadius: '10px', padding: '12px', fontWeight: 'bold', marginTop: '10px', cursor: 'pointer' }}>Confirmar Pedido</button>
            <button onClick={() => setIsCartOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--color-orange)', cursor: 'pointer' }}>Cerrar</button>
          </div>
        </div>
      )}

      <UpsellModal 
        isOpen={isUpsellOpen} 
        onClose={() => setIsUpsellOpen(false)} 
        onAddVela={() => updateQuantity(999, 1)} 
        updateQuantity={updateQuantity}
        productos={productos}
        quantities={quantities}
      />

      <div style={{ position: 'fixed', bottom: '20px', left: '20px', right: '20px', backgroundColor: 'rgba(247, 214, 193, 0.14)', backdropFilter: 'blur(15px)', border: '1px solid var(--color-pink)', borderRadius: '50px', padding: '15px 0', display: 'flex', justifyContent: 'center', zIndex: 1000, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
        <button onClick={() => setIsCartOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-pink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          {totalItems > 0 && <div style={{ position: 'absolute', top: '-5px', right: '-5px', backgroundColor: 'var(--color-orange)', color: 'var(--color-crema)', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{totalItems}</div>}
        </button>
      </div>

      <InstallPrompt />
    </div>
  );
}