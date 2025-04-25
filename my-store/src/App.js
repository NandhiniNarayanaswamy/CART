import React, { useEffect, useState } from "react";
import "./App.css";

function Navbar({ cart, onCartClick }) {
  return (
    <div className="navbar">
      <h1>MY Store</h1>
      <button className="cart-button" onClick={onCartClick}>
        Cart ({cart.length})
      </button>
    </div>
  );
}

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const addToCart = (product) => {
    const isProductInCart = cart.some((item) => item.id === product.id);
    if (isProductInCart) {
      alert("Item already added to the cart");
    } else {
      setCart([...cart, product]);
      alert(`${product.title} added to cart!`);
    }
    setIsModalOpen(false);
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const toggleCartModal = () => {
    setIsCartModalOpen(!isCartModalOpen);
  };

  return (
    <div className="app-container">
      <Navbar cart={cart} onCartClick={toggleCartModal} />

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="card">
            <img src={product.image} alt={product.title} />
            <h2 className="card-title">
              {product.title.length > 40
                ? product.title.slice(0, 40) + "..."
                : product.title}
            </h2>
            <p className="card-price">${product.price}</p>
            <button className="btn" onClick={() => openModal(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Product Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedProduct.title}</h2>
            <img src={selectedProduct.image} alt={selectedProduct.title} />
            <p>{selectedProduct.description}</p>
            <p className="card-price">${selectedProduct.price}</p>
            <button className="btn" onClick={() => addToCart(selectedProduct)}>
              Confirm Add to Cart
            </button>
            <button className="btn btn-close" onClick={() => setIsModalOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {isCartModalOpen && (
        <div className="modal-overlay" onClick={() => setIsCartModalOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Your Cart</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <div className="cart-items">
                {cart.map((item, index) => (
                  <div key={index} className="cart-item">
                    <img src={item.image} alt={item.title} />
                    <div>
                      <p className="cart-title">{item.title}</p>
                      <p className="card-price">${item.price}</p>
                      <button className="btn btn-remove" onClick={() => removeFromCart(item.id)}>
                        Remove from Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button className="btn btn-close" onClick={() => setIsCartModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
