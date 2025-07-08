
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);


//   useEffect(() => {
//   fetch('https://tab2buy.onrender.com/products')
//     .then((res) => res.json())
//     .then((data) => {
//       const found = data.find(p => p.id.toString() === id.toString());
//       if (found) {
//         setProduct(found);
//       } else {
//         alert('❌ Product not found!');
//         navigate('/');
//       }
//     })
//     .catch((err) => {
//       console.error('Error fetching product details:', err);
//       alert('❌ Error loading product!');
//       navigate('/');
//     });
// }, [id, navigate]);

  useEffect(() => {
  fetch(`https://tab2buy.onrender.com/products/${id}`)
    .then((res) => {
      if (!res.ok) { 
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      if (data) {
        setProduct(data);
      } else {
        alert('❌ Product not found!');
        navigate('/');
      }
    })
    .catch((err) => {
      console.error('Error fetching product details:', err);
      alert('❌ Error loading product! Check console for details.');
      navigate('/');
    });
}, [id, navigate]);



  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === product.id);
    let updatedCart;

    if (existing) {
      updatedCart = cart.map(item =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, qty: 1 }];
    }

    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('🛒 Product added to cart!');
  };

  if (!product) return <p className="loading">Loading product details...</p>;

  return (
    <div className="product-details-container">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h2>{product.name}</h2>
        <p className="description">{product.description}</p>
        <p className="price">₹{product.price}</p>
        <button onClick={handleAddToCart} className="add-btn">Add to Cart</button>
        <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
      </div>
    </div>
  );
};

export default ProductDetails;
