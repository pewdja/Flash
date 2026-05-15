import React from 'react';
import { useProductData } from '../context/ProductContext.jsx';
import { ShoppingBag, TrendingUp, Users, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const { count } = useProductData();

  const stats = [
    { label: 'Total Products', value: count, icon: Package, color: 'text-blue-600' },
    { label: 'Sales Today', value: '$1.2k', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Active Users', value: '42', icon: Users, color: 'text-purple-600' },
    { label: 'Pending', value: '7', icon: ShoppingBag, color: 'text-orange-600' },
  ];

  return (
    <div className="p-8 md:p-16 text-left">
      <div className="max-w-4xl">
        <h1 className="text-5xl font-black mb-6 text-gray-900 tracking-tight leading-tight">
          Manage your <span className="text-blue-600">inventory</span>
        </h1>
        <p className="text-xl text-gray-500 mb-12 max-w-2xl leading-relaxed">
          The ultimate control center for your shop.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
          {stats.map((stat) => (
            <div key={stat.label} className="p-6 border-2 border-gray-50 rounded-3xl bg-white shadow-sm hover:border-blue-100 transition-colors">
              <div className={`mb-3 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-3xl font-black text-gray-900 mb-1">{stat.value}</p>
              <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest">{stat.label}</h3>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <Link to="/products" className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200 text-center">
            View Inventory
          </Link>
          <Link to="/add-product" className="bg-white text-gray-900 border-2 border-gray-100 px-10 py-5 rounded-2xl font-black text-lg hover:bg-gray-50 transition text-center">
            New Item
          </Link>
        </div>
      </div>
    </div>
  );
}
