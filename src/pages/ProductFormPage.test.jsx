import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
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
  beforeEach(() => {
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('renders form elements', () => {
    renderWithProviders(<ProductFormPage />);
    
    expect(screen.getByLabelText(/Product Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Add to Inventory/i })).toBeInTheDocument();
  });

  it('shows error if fields are missing', () => {
    renderWithProviders(<ProductFormPage />);
    
    const submitBtn = screen.getByRole('button', { name: /Add to Inventory/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText(/Please fill in everything/i)).toBeInTheDocument();
  });

  it('submits correctly with valid data', () => {
    localStorage.clear();
    renderWithProviders(<ProductFormPage />);
    
    fireEvent.change(screen.getByLabelText(/Product Name/i), { target: { value: 'Test Product' } });
    fireEvent.change(screen.getByLabelText(/Price/i), { target: { value: '99' } });
    fireEvent.change(screen.getByLabelText(/Description/i), { target: { value: 'Test Desc' } });

    fireEvent.click(screen.getByRole('button', { name: /Add to Inventory/i }));

    expect(window.alert).toHaveBeenCalledWith('Done! Product added.');
  });
});
