import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ProductProvider } from '../context/ProductContext.jsx';
import ProductFormPage from './ProductFormPage.jsx';

const renderWithProviders = (ui) => {
  return render(
    <ProductProvider>
      <BrowserRouter>
        {ui}
      </BrowserRouter>
    </ProductProvider>
  );
};

describe('ProductFormPage', () => {
  it('renders form elements', () => {
    renderWithProviders(<ProductFormPage />);
    
    expect(screen.getByPlaceholderText(/Leather Jacket/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/0.00/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tell us about it/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Product/i })).toBeInTheDocument();
  });

  it('shows error if fields are missing', () => {
    renderWithProviders(<ProductFormPage />);
    
    const submitBtn = screen.getByRole('button', { name: /Create Product/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/Please fill in everything/i)).toBeInTheDocument();
  });

  it('submits correctly with valid data', () => {
    // Clear localStorage first
    localStorage.clear();
    renderWithProviders(<ProductFormPage />);
    
    fireEvent.change(screen.getByPlaceholderText(/Leather Jacket/i), { target: { value: 'Test Product' } });
    fireEvent.change(screen.getByPlaceholderText(/0.00/i), { target: { value: '99' } });
    fireEvent.change(screen.getByPlaceholderText(/Tell us about it/i), { target: { value: 'Test Desc' } });

    fireEvent.click(screen.getByRole('button', { name: /Create Product/i }));

    expect(window.alert).toHaveBeenCalledWith('Done! Product added.');
  });
});
