import React, { useState, useEffect } from 'react';
import "../styles/Cart.css"
const Cart = () => {
  const [cart, setCart] = useState([]);

  // Get data from localStorage on first render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (err) {
        console.error("Failed to parse cart:", err);
      }
    }
  }, []);

  //Update localStorage when cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const increaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    ));
  };

  const decreaseQty = (id) => {
    setCart(cart.map(item =>
      item.id === id && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    ));
  };

  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleBuyNow = () => {
    alert("Your order has been placed successfully!");
    setCart([]);
    localStorage.removeItem('cart');
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2);

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Cart is empty</p>
      ) : (
        <>
          {cart.map(item => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} width={100} />
              <div>
                <h3>{item.name}</h3>
                <p>₹{item.price}</p>
                <div className='qty-control'>
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span style={{ margin: "0 10px" }}>{item.qty}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>
                <button onClick={() => removeItem(item.id)} className='remove-btn'>Remove</button>
              </div>
            </div>
          ))}
          <div className="total-section">
            <h3>Total: ₹{total}</h3>
            <button onClick={handleBuyNow}>Buy Now</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
