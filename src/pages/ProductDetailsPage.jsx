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
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <h2 className="text-2xl font-bold text-gray-900 underline decoration-blue-500 decoration-4 underline-offset-8">Current Inventory</h2>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search by name..." 
            className="border border-gray-300 p-2 pl-10 rounded shadow-sm w-full focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map(product => (
          <div key={product.id} className="border border-gray-200 rounded shadow-sm bg-white flex flex-col">
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2 mt-1">{product.description}</p>
              
              <div className="mt-auto flex justify-between items-center border-t pt-4">
                {editingId === product.id ? (
                  <div className="flex items-center gap-1">
                    <input 
                      type="number" 
                      className="border border-blue-500 w-20 p-1 rounded font-bold" 
                      value={tempPrice}
                      autoFocus
                      onChange={(e) => setTempPrice(e.target.value)}
                    />
                    <button onClick={() => saveEdit(product.id)} className="text-green-600 p-1 hover:bg-green-50 rounded" title="Save"><Check className="w-4 h-4"/></button>
                    <button onClick={() => setEditingId(null)} className="text-red-600 p-1 hover:bg-red-50 rounded" title="Cancel"><X className="w-4 h-4"/></button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xl text-gray-900">${product.price}</span>
                    <button onClick={() => startEdit(product)} className="text-gray-400 hover:text-blue-600" title="Edit price">
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
                
                <button 
                  onClick={() => deleteItem(product.id)}
                  title="Remove item"
                  className="text-gray-400 hover:text-red-600 p-2"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 border rounded bg-gray-50 border-gray-200">
          <p className="text-gray-500">No items found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
