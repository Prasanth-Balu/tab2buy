
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://tab2buy.onrender.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error('Failed to fetch products:', err));
  }, []);

  return (
    <div className="product-list-container">
      {products.map((product) => (
        <Link to={`/product/${product.id}`} key={product.id} className="product-card">
          <img src={product.image} alt={product.name} />
          <h3>{product.name}</h3>
          <p className="description">{product.description}</p>
          <p className="price">₹{product.price}</p>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
