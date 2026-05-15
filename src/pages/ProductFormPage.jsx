/**
 * [Isabella] - "Whatcha doin?"
 * Added labels and accessibility hooks to the product form.
 */
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
      <h2 className="text-2xl font-bold mb-4">Add New Item</h2>
      
      {error && (
        <div className="bg-red-100 text-red-900 p-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6 border border-gray-200 rounded-lg bg-gray-50">
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-1 font-medium">Product Name</label>
          <input
            id="name"
            type="text"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 bg-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 mb-1 font-medium">Price</label>
          <input
            id="price"
            type="text"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 bg-white"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label htmlFor="desc" className="block text-gray-700 mb-1 font-medium">Description</label>
          <textarea
            id="desc"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500 bg-white h-24"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white font-bold py-3 rounded hover:bg-blue-700 shadow-sm"
        >
          Add to Inventory
        </button>
      </form>
    </div>
  );
}
