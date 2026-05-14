import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, ListOrdered } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6" />
          SwiftAdmin
        </Link>
        <div className="flex gap-6">
          <Link to="/products" className="flex items-center gap-1 hover:underline">
            <ListOrdered className="w-4 h-4" />
            View Products
          </Link>
          <Link to="/add-product" className="flex items-center gap-1 hover:underline">
            <PlusCircle className="w-4 h-4" />
            Add Product
          </Link>
        </div>
      </div>
    </nav>
  );
}
