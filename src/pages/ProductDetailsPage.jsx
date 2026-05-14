import React, { useState } from 'react';
import { useProductData } from '../context/ProductContext.jsx';
import { Trash2, Edit2, Check, X, Search } from 'lucide-react';

const ProductDetailsPage = () => {
  const { items, deleteItem, updateItem } = useProductData();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [tempPrice, setTempPrice] = useState('');

  const filtered = items.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startEdit = (p) => {
    setEditingId(p.id);
    setTempPrice(p.price.toString());
  };

  const saveEdit = (id) => {
    updateItem(id, { price: Number(tempPrice) });
    setEditingId(null);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <h2 className="text-3xl font-black italic tracking-tighter text-blue-900">INVENTORY</h2>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search items..." 
            className="border-2 border-gray-100 p-3 pl-10 rounded-2xl w-full focus:border-blue-500 outline-none transition-all shadow-inner bg-gray-50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filtered.map(product => (
          <div key={product.id} className="group border border-gray-100 rounded-3xl bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col">
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-xl font-bold mb-1 text-gray-800">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-6 line-clamp-2 italic">"{product.description}"</p>
              
              <div className="mt-auto flex justify-between items-center bg-gray-50 p-4 rounded-2xl">
                {editingId === product.id ? (
                  <div className="flex items-center gap-2">
                    <input 
                      type="number" 
                      className="border-2 border-blue-400 w-24 p-2 rounded-lg outline-none font-bold" 
                      value={tempPrice}
                      autoFocus
                      onChange={(e) => setTempPrice(e.target.value)}
                    />
                    <button onClick={() => saveEdit(product.id)} className="bg-green-100 text-green-700 p-2 rounded-lg hover:bg-green-200" aria-label="Save price"><Check className="w-5 h-5"/></button>
                    <button onClick={() => setEditingId(null)} className="bg-red-100 text-red-700 p-2 rounded-lg hover:bg-red-200" aria-label="Cancel edit"><X className="w-5 h-5"/></button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="font-black text-2xl text-blue-600">${product.price}</span>
                    <button onClick={() => startEdit(product)} className="text-gray-400 hover:text-blue-500 transition-colors" aria-label="Edit price">
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
                
                <button 
                  onClick={() => deleteItem(product.id)}
                  aria-label="Delete product"
                  className="bg-white text-red-500 border border-red-100 p-3 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-90"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-4 border-dashed border-gray-200">
          <div className="text-gray-300 mb-4 flex justify-center">
            <Search className="w-16 h-16" />
          </div>
          <p className="text-xl font-bold text-gray-400 italic">No matches found.</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
