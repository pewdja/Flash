/**
 * [Baljeet] - "I have calculated the most efficient data structure."
 * Cleaned up the context logic and storage synchronization.
 */
import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('sa_inventory_data');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (err) {
        console.error("Storage parse error:", err);
      }
    }
    setLoading(false);
  }, []);

  const syncStorage = (newList) => {
    localStorage.setItem('sa_inventory_data', JSON.stringify(newList));
    setItems(newList);
  };


  const addItem = (data) => {
    const newItem = {
      ...data,
      id: Date.now().toString()
    };
    syncStorage([newItem, ...items]);
  };

  const updateItem = (id, updates) => {
    const updated = items.map(i => i.id === id ? { ...i, ...updates } : i);
    syncStorage(updated);
  };

  const deleteItem = (id) => {
      const filtered = items.filter(i => i.id !== id);
      syncStorage(filtered);
  };

  return (
    <ProductContext.Provider value={{ 
      items, 
      loading, 
      addItem, 
      updateItem, 
      deleteItem,
      count: items.length 
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductData = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProductData must be inside a ProductProvider');
  return context;
};
