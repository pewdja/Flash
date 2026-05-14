import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ProductProvider } from '../context/ProductContext.jsx';
import ProductDetailsPage from './ProductDetailsPage.jsx';

const sampleProducts = [
  { id: '1', name: 'iPhone 15', price: 999, description: 'Apple flagship', imageUrl: 'https://img.com/1', createdAt: Date.now() },
  { id: '2', name: 'Samsung S24', price: 899, description: 'Samsung flagship', imageUrl: 'https://img.com/2', createdAt: Date.now() }
];

const renderWithProviders = (ui) => {
  return render(
    <ProductProvider>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </ProductProvider>
  );
};

describe('ProductDetailsPage', () => {
  beforeEach(() => {
    localStorage.setItem('swift_admin_products', JSON.stringify(sampleProducts));
  });

  it('renders products from localStorage', () => {
    renderWithProviders(<ProductDetailsPage />);
    
    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    expect(screen.getByText('Samsung S24')).toBeInTheDocument();
    expect(screen.getByText('$999')).toBeInTheDocument();
  });

  it('filters products based on search input', () => {
    renderWithProviders(<ProductDetailsPage />);
    
    const searchInput = screen.getByPlaceholderText(/Search items/i);
    fireEvent.change(searchInput, { target: { value: 'iPhone' } });

    expect(screen.getByText('iPhone 15')).toBeInTheDocument();
    expect(screen.queryByText('Samsung S24')).not.toBeInTheDocument();
  });

  it('removes a product when delete button is clicked', async () => {
    renderWithProviders(<ProductDetailsPage />);
    
    const deleteButtons = screen.getAllByRole('button', { name: /Delete product/i });
    fireEvent.click(deleteButtons[0]);

    expect(screen.queryByText('iPhone 15')).not.toBeInTheDocument();
    expect(screen.getByText('Samsung S24')).toBeInTheDocument();
  });

  it('updates product price through inline editing', async () => {
    renderWithProviders(<ProductDetailsPage />);
    
    const editBtns = screen.getAllByRole('button', { name: /Edit price/i });
    fireEvent.click(editBtns[0]);

    const priceInput = screen.getByDisplayValue('999');
    fireEvent.change(priceInput, { target: { value: '1099' } });
    
    const saveBtn = screen.getByRole('button', { name: /Save price/i });
    fireEvent.click(saveBtn);

    expect(screen.getByText(/\$1099/i)).toBeInTheDocument();
  });
});
