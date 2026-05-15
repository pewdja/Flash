import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductData } from '../context/ProductContext.jsx';

export default function ProductFormPage() {
  const { addItem } = useProductData();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [desc, setDesc] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !price || !desc) {
      setError('Please fill in everything.');
      return;
    }

    if (isNaN(Number(price))) {
      setError('Price needs to be a number');
      return;
    }

    addItem({
      name,
      price: Number(price),
      description: desc
    });

    alert('Done! Product added.');
    navigate('/products');
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-6">New Product</h2>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-6 border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 shadow-xl p-8 border rounded-2xl bg-white">
        <div>
          <label className="block text-gray-600 mb-1 text-sm font-semibold uppercase tracking-wider">Name</label>
          <input
            type="text"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Leather Jacket"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1 text-sm font-semibold uppercase tracking-wider">Price (KSH/USD)</label>
          <input
            type="text"
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="0.00"
          />
        </div>

        <div>
          <label className="block text-gray-600 mb-1 text-sm font-semibold uppercase tracking-wider">About this Product</label>
          <textarea
            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50 h-28"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Tell us about it..."
          ></textarea>
        </div>

        

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-all active:scale-95"
        >
          Create Product
        </button>
      </form>
    </div>
  );
}
