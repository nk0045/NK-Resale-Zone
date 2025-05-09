import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./Header.jsx";
import CarList from "./CarList.jsx";
import Cart from "./Cart.jsx";
import CustomerLogin from "./CustomerLogin.jsx";
import StaffLogin from "./StaffLogin.jsx";
import cars from "./cars.js";
import "./styles.css";
import CarDetails from './CarDetails';
import logo from './assets/MyNKLogo.png';
import Footer from "./Footer";
import StaffDashboard from "./StaffDashboard.jsx";

const App = () => {
  <Router>
  <Routes>
    <Route path="/staff-login" element={<StaffLogin />} />
    <Route path="/staff-dashboard" element={<StaffDashboard />} />
  </Routes>
</Router>
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("home");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [showEmiCalculator, setShowEmiCalculator] = useState(false);

  const [carModel, setCarModel] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(12);
  const [emiResult, setEmiResult] = useState(null);

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
    setCart([]);
  };

 
  const parsePrice = (priceStr) => {
    const cleaned = priceStr.toLowerCase().replace(/[^0-9.]/g, "");
    if (priceStr.toLowerCase().includes("crore")) {
      return parseFloat(cleaned) * 10000000;
    } else if (priceStr.toLowerCase().includes("lakh")) {
      return parseFloat(cleaned) * 100000;
    } else {
      return parseFloat(cleaned);
    }
  };

  
  const formatPrice = (price) => {
    if (price >= 10000000) return (price / 10000000).toFixed(2) + " Crore";
    if (price >= 100000) return (price / 100000).toFixed(2) + " Lakh";
    return "₹" + price.toLocaleString();
  };

  
  const calculateEmi = (P, annualRate, N) => {
    const R = annualRate / 12 / 100;
    const emi = P * R * Math.pow(1 + R, N) / (Math.pow(1 + R, N) - 1);
    return emi;
  };

  
  const handleCalculate = (e) => {
    e.preventDefault();
    const principal = parseFloat(loanAmount) - parseFloat(downPayment);
    const rate = parseFloat(interestRate);
    const tenure = parseInt(loanTenure);

    if (principal <= 0) {
      alert("Down Payment should be less than Loan Amount!");
      return;
    }

    const emi = calculateEmi(principal, rate, tenure);
    const totalPayment = emi * tenure;
    const totalInterest = totalPayment - principal;

    setEmiResult({
      emi: emi.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalPayment: totalPayment.toFixed(2)
    });
  };

  return (
    <div className="app">
      <Header setPage={setPage} />

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

        <button className="home-btn" onClick={() => {
          setPage("emi");
          setShowEmiCalculator(true);
        }}>
          EMI Calculator
        </button>

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

      {page === "emi" && showEmiCalculator && (
        <div className="full-page">
          <div className="emi-calculator-box">
            <h2>EMI Calculator</h2>
            <button className="close-btn" onClick={() => {
              setShowEmiCalculator(false);
              setPage("home");
            }}>×</button>

            <form onSubmit={handleCalculate}>
              <div className="form-group">
                <label>Select Car Model:</label>
                <select
                  value={carModel}
                  onChange={(e) => {
                    setCarModel(e.target.value);
                    const selectedCar = cars.find(car => car.name === e.target.value);
                    if (selectedCar) {
                      const price = parsePrice(selectedCar.price);
                      setLoanAmount(price.toString());
                    }
                  }}
                  required
                >
                  <option value="">-- Select Car --</option>
                  {cars.map(car => {
                    const price = parsePrice(car.price);
                    return (
                      <option key={car.id} value={car.name}>
                        {car.name} - {formatPrice(price)}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="form-group">
                <label>Car Price (₹):</label>
                <input
                  type="number"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Down Payment (₹):</label>
                <select
  id="downPayment"
  value={downPayment}
  onChange={(e) => {
    const value = e.target.value;
    if (value === "no") {
      setDownPayment(0);
    } else {
      setDownPayment(Number(value));
    }
  }}
>
  <option value="">Select Down Payment</option>
  <option value="no">No Down Payment</option>
  <option value="50000">₹50,000</option>
  <option value="100000">₹1,00,000</option>
  <option value="200000">₹2,00,000</option>
  <option value="500000">₹5,00,000</option>
</select>

              </div>

              <div className="form-group">
                <label>Interest Rate (% p.a.):</label>
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label>Loan Tenure (months):</label>
                <select
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(e.target.value)}
                  required
                >
                  <option value="12">12 months</option>
                  <option value="24">24 months</option>
                  <option value="36">36 months</option>
                  <option value="48">48 months</option>
                  <option value="60">60 months</option>
                </select>
              </div>

              <button type="submit" className="calculate-btn">Calculate EMI</button>
            </form>

            {emiResult && (
              <div className="emi-result">
                <h3>EMI Result</h3>
                <p><strong>Monthly EMI:</strong> ₹{emiResult.emi}</p>
                <p><strong>Total Interest:</strong> ₹{emiResult.totalInterest}</p>
                <p><strong>Total Payment:</strong> ₹{emiResult.totalPayment}</p>
              </div>
            )}
          </div>
        </div>
      )}

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
            <label><input type="radio" name="payment" value="credit" required /> Credit/Debit</label><br />
            <label><input type="radio" name="payment" value="netbanking" /> Net Banking</label><br />
            <label><input type="radio" name="payment" value="upi" /> UPI (Advance Payment)</label><br />
            <button type="submit">Pay Now</button>
          </form>
        </div>
      )}

      {page === "about" && (
        <div className="about-us">
          <img src={logo} alt="Company Logo" className="company-logo" />
          <h2>About Us</h2>
          <p>
          Welcome to <strong>NK Auto Resale Zone</strong>, your trusted partner in buying and selling
          pre-owned cars. We believe in providing quality vehicles with complete transparency and
          excellent customer service. Our team is passionate about helping you find the perfect car at
          the best price.
        </p>
        <p>
          At NK Auto Resale Zone, we thoroughly inspect each car in our inventory to ensure they meet
          our high standards. Our commitment is to give you a seamless buying experience, from
          selection to delivery.
        </p>
        <p>
          Whether you're a first-time buyer or a seasoned car enthusiast, we offer a range of
          vehicles to match your needs. Explore our wide selection and let us help you drive away with
          your dream car.
        </p>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default App;
