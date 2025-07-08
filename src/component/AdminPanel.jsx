
import React, { useEffect, useState } from 'react';
import '../styles/AdminPanel.css';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: '', image: '', description: '', price: '' });

  const fetchProducts = () => {
    fetch('https://tab2buy.onrender.com/products')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleInput = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAddProduct = (e) => {
    e.preventDefault();
    const newProduct = { ...form, price: parseFloat(form.price), id: Date.now().toString()};
    fetch('https://tab2buy.onrender.com/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    })
    .then(() => {
      fetchProducts();
      setForm({ name: '', image: '', description: '', price: '' });
    });
  };

  const handleDelete = (id) => {
    fetch(`https://tab2buy.onrender.com/products/${id.toString()}`, { method: 'DELETE' })
      .then(() => fetchProducts());
  };

  return (
    <div className="admin-panel">
      <h2 style={{color: "#00838f"}}>Admin Panel</h2>
      <form onSubmit={handleAddProduct} className="product-form">
        <input name="name" placeholder="Product Name" value={form.name} onChange={handleInput} required />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleInput} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleInput} required />
        <input name="price" placeholder="Price" type="number" value={form.price} onChange={handleInput} required />
        <button type="submit">Add Product</button>
      </form>
      <div className="admin-products">
        {products.map(p => (
          <div key={p.id} className="admin-product-card">
            <img src={p.image} alt={p.name} />
            <div>
              <h4>{p.name}</h4>
              <p>₹{p.price}</p>
              <button onClick={() => handleDelete(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;
