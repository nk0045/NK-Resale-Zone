import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./Header.jsx";
import CarList from "./CarList.jsx";
import Cart from "./Cart.jsx";
import CustomerLogin from "./CustomerLogin.jsx";
import StaffLogin from "./StaffLogin.jsx";
import cars from "./cars.js";
import "./styles.css";
import CarDetails from './CarDetails'; // adjust path if needed
import logo from './assets/Nk_Logo.png';
import Footer from "./Footer";
<Route path="/car/:id" element={<CarDetails />} />

const App = () => {
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("home"); 
  const [address, setAddress] = useState(""); 
  const [location, setLocation] = useState("");
  const addToCart = (car) => {
    setCart([...cart, car]);
  };

  const clearCart = () => {
    alert("Cleared Successfully!");
    setCart([]);
  };


  const handleCheckout = () => {
    setPage("address"); 
  };

  const handleConfirmOrder = (event) => {
    event.preventDefault(); 
    setPage("payment"); 
  };

  const handlePayment = (event) => {
    event.preventDefault(); 
    alert("Payment Successful! Thank you for your purchase.");
    setPage("home"); 
  };

  return (
    <div className="app">
      <Header setPage={setPage}/>
      <div className="nav-buttons">
        <button className="home-btn" onClick={() => setPage("home")}>Home</button>
        <button className="home-btn" onClick={() => setPage("customer")}>Customer Login</button>
        <button className="home-btn" onClick={() => setPage("staff")}>Staff Login</button>

        <select 
  className="drop-down" 
  value={location} 
  onChange={(e) => setLocation(e.target.value)}
>
  <option value="" disabled selected>Location</option>
  <option value="Coimbatore">Coimbatore</option>
  <option value="Salem">Salem</option>
  <option value="Chennai">Chennai</option>
  <option value="Madurai">Madurai</option>
</select>
        <button className="home-btn" onClick={() => setPage("about")}>About Us</button>
      </div>

      {page === "home" && (
        <div className="main-content">
          <CarList cars={cars} addToCart={addToCart} />
          <Cart cartItems={cart} clearCart={clearCart} handleCheckout={handleCheckout} />
        </div>
      )}

      {page === "customer" && <CustomerLogin />}
      {page === "staff" && <StaffLogin />}
      {page === "address" && (
        <div className="full-page">
          <h2>Enter Your Address for further Communication:</h2>
          <form onSubmit={handleConfirmOrder}>
            <input
              type="text"
              placeholder="Enter address here.."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <button type="submit">Confirm Order</button>
          </form>
        </div>
      )}
      {page === "payment" && (
        <div className="full-page">
          <h2>Select Payment Method</h2>
          <form onSubmit={handlePayment}>
            <label>
              <input type="radio" name="payment" value="credit" /> Credit/Debit
            </label>
            <br />
            <label>
              <input type="radio" name="payment" value="netbanking" /> Net Banking
            </label>
            <br />
            <label>
              <input type="radio" name="payment" value="upi" /> UPI (Advance Payment)
            </label>
            <br />
            <button type="submit">Pay Now</button>
          </form>
        </div>
      )}

      {page === "about" && (
        <div className="about-us">
          <img src={logo} alt="Company Logo" className="company-logo" />
          <h2>About Us</h2>
          <p>We are a premier car dealership established in 2019, with a commitment to providing the best selection of pre-owned vehicles to our customers. Our goal is to make car buying a hassle-free and enjoyable experience. We pride ourselves on our customer-centric approach, offering quality cars at competitive prices with excellent after-sales support.</p>
          <p>Our journey started with a small team of passionate individuals who believed in making car buying a transparent and accessible process. Over the years, we have grown to become one of the most trusted names in the industry, serving hundreds of satisfied customers each year.</p>
          <p>Our mission is to continue evolving, embracing the latest technologies, and expanding our offerings to better serve our customers' needs.</p>
        </div>
      )}
      <Footer />
    </div>

  );
};

export default App;
