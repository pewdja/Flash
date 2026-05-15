import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, ListOrdered } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 py-4 px-6 mb-6">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link to="/" className="text-2xl font-bold text-gray-900 border-b-2 border-blue-600">
          SwiftAdmin
        </Link>
        <div className="flex gap-4">
          <Link 
            to="/products" 
            className="text-gray-600 font-medium hover:text-blue-600"
          >
            Inventory
          </Link>
          <Link 
            to="/add-product" 
            className="bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700"
          >
            Add Product
          </Link>
        </div>
      </div>
    </nav>
  );
}
