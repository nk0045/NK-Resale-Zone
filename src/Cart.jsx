import React from "react";

const Cart = ({ cartItems, clearCart, handleCheckout }) => {
  const total = cartItems.reduce((sum, item) => {
    const priceStr = item.price.toLowerCase().replace(/[^0-9.]/g, '');
    const priceNum = parseFloat(priceStr);
  
    if (item.price.toLowerCase().includes("crore")) {
      return sum + priceNum * 10000000; // 1 Crore = 1 Cr = 1,00,00,000
    } else if (item.price.toLowerCase().includes("lakh")) {
      return sum + priceNum * 100000; // 1 Lakh = 1,00,000
    } else {
      return sum + priceNum; // in case it's already in plain numbers
    }
  }, 0);
  return (
    <div className="cart">
      <h2>🛒 My Bookings</h2>
      {cartItems.length === 0 ? (
        <p>No Bookings until now</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item, idx) => (
              <li key={idx}>
                {item.name} - ₹{item.price.toLocaleString()}
              </li>
            ))}
          </ul>
          <h3>
  Total: ₹
  {total >= 10000000
    ? (total / 10000000).toFixed(2) + " Crores"
    : (total / 100000).toFixed(2) + " Lakhs"}
</h3>
          <div className="cart-buttons">
            <button className="clear-btn" onClick={clearCart}>Clear</button>
            <button className="confirm-btn" onClick={handleCheckout}>Confirm</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
