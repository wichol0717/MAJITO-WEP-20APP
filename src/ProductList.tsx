import { useEffect, useState } from 'react';
import { supabase } from './lib/supabaseClient';
import ProductCard from './components/ProductCard';

export default function ProductList() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from('products')
        .select('*');

      if (error) {
        console.error("Error:", error);
      } else {
        setProducts(data || []);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="bg-[#121212] min-h-screen p-4 pb-24">
      <h1 className="text-[#c89d7c] text-4xl font-serif mb-8 mt-4 text-center">Majito Cake</h1>
      
      <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
        {products.map((p: any) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}