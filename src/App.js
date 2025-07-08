import React from 'react';
import {Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from './component/Header'
import ProductList from './component/ProductList'
import ProductDetails from './component/ProductDetails'
import Cart from './component/Cart'
import AdminPanel from './component/AdminPanel'

const App = () => {
  return (
      <BrowserRouter>
        <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    
      </BrowserRouter>
        
    
  );
};

export default App;
