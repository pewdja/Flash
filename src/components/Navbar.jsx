import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, ListOrdered } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white border-b-2 border-gray-50 p-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link to="/" className="text-3xl font-black italic tracking-tighter text-blue-600 flex items-center gap-2">
          <LayoutDashboard className="w-8 h-8" />
          SwiftAdmin
        </Link>
        <div className="flex gap-3">
          <Link 
            to="/products" 
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gray-50 text-gray-900 font-bold hover:bg-gray-100 transition-all active:scale-95"
          >
            <ListOrdered className="w-5 h-5" />
            Inventory
          </Link>
          <Link 
            to="/add-product" 
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
          >
            <PlusCircle className="w-5 h-5" />
            New Item
          </Link>
        </div>
      </div>
    </nav>
  );
}
