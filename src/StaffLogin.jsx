import React, { useState } from 'react';
import StaffDashboard from './StaffDashboard';

const StaffLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  
  const bookedCars = [
    {
      model: 'Skoda Slavia',
      customerName: 'John Doe',
      purchaseDate: '2025-05-01 10:30 AM',
      address: '123 Main St, Yercaud, Salem',
      paymentMethod: 'Credit Card',
    },
    {
      model: 'Hyundai I20',
      customerName: 'Jane Smith',
      purchaseDate: '2025-05-02 11:15 AM',
      address: '456 Second St, Salem',
      paymentMethod: 'Debit Card',
    },
  ];

  const stock = {
    'Skoda Slavia': 5,
    'Hyundai I20': 3,
  };

  const handleLogin = () => {
    if (username === 'staff' && password === 'password') {
      setIsLoggedIn(true); 
    } else {
      setError('Invalid credentials');
    }
  };

  if (isLoggedIn) {
    return (
      <div className="dashboard">
        <h2>Staff Dashboard</h2>
        <div className="booked-cars">
          <h3>Booked Cars:</h3>
          <table>
            <thead>
              <tr>
                <th>Car Model</th>
                <th>Customer Name</th>
                <th>Purchase Date</th>
                <th>Address</th>
                <th>Payment Method</th>
              </tr>
            </thead>
            <tbody>
              {bookedCars.map((car, index) => (
                <tr key={index}>
                  <td>{car.model}</td>
                  <td>{car.customerName}</td>
                  <td>{car.purchaseDate}</td>
                  <td>{car.address}</td>
                  <td>{car.paymentMethod}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="stock">
          <h3>Remaining Stock:</h3>
          <ul>
            {Object.keys(stock).map((carModel) => (
              <li key={carModel}>
                {carModel}: {stock[carModel]} remaining
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-box fade-in">
        <h2>Staff Login</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="input-field"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input-field"
        />
        <button onClick={handleLogin} className="login-button">
          Login
        </button>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default StaffLogin;
