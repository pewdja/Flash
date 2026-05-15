import React from 'react';
import { useProductData } from '../context/ProductContext.jsx';
import { ShoppingBag, TrendingUp, Users, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const { count } = useProductData();

  return (
    <div className="p-8 md:p-12">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 px-2 border-l-4 border-blue-600">
          Inventory Dashboard
        </h1>
        <p className="text-lg text-gray-600 mb-10">
          Track products and stock levels from one place.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="p-5 border border-gray-200 rounded shadow-sm bg-white">
            <Package className="w-5 h-5 text-blue-600 mb-2" />
            <p className="text-2xl font-bold">{count}</p>
            <h3 className="text-gray-500 text-sm">Total Items</h3>
          </div>
          
          <div className="p-5 border border-gray-200 rounded shadow-sm bg-white">
            <TrendingUp className="w-5 h-5 text-green-600 mb-2" />
            <p className="text-2xl font-bold">$1,240</p>
            <h3 className="text-gray-500 text-sm">Today's Sales</h3>
          </div>

          <div className="p-5 border border-gray-200 rounded shadow-sm bg-white">
            <Users className="w-5 h-5 text-purple-600 mb-2" />
            <p className="text-2xl font-bold">42</p>
            <h3 className="text-gray-500 text-sm">Active</h3>
          </div>

          <div className="p-5 border border-gray-200 rounded shadow-sm bg-white">
            <ShoppingBag className="w-5 h-5 text-orange-600 mb-2" />
            <p className="text-2xl font-bold">7</p>
            <h3 className="text-gray-500 text-sm">Pending</h3>
          </div>
        </div>

        <div className="flex gap-4">
          <Link to="/products" className="bg-gray-800 text-white px-8 py-3 rounded font-semibold text-sm hover:bg-gray-900 shadow-md">
            View Inventory
          </Link>
          <Link to="/add-product" className="bg-white text-gray-800 border border-gray-300 px-8 py-3 rounded font-semibold text-sm hover:bg-gray-50">
            Add New Item
          </Link>
        </div>
      </div>
    </div>
  );
}
