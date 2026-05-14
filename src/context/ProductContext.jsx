import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load from storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('swift_admin_products');
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (err) {
        console.error("Error parsing localstorage data", err);
      }
    }
    setLoading(false);
  }, []);

  // Helper to save to storage
  const syncStorage = (newList) => {
    localStorage.setItem('swift_admin_products', JSON.stringify(newList));
    setItems(newList);
  };

  const addItem = (data) => {
    const newItem = {
      ...data,
      id: "prod_" + Date.now(),
      createdAt: new Date().toISOString(),
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

// This is the only hook we need
export const useProductData = () => {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProductData must be inside a ProductProvider');
  return context;
};
