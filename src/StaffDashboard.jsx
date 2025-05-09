import React, { useState, useEffect } from 'react';


const StaffDashboard = () => {
  const [carStock, setCarStock] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const storedBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    setBookings(storedBookings);

    const updatedCarStock = [
      { id: 1, name: 'Hyundai I20', stock: 5, modelName: 'I20', price: 700000, description: 'A compact hatchback' },
      { id: 2, name: 'Skoda Slavia', stock: 3, modelName: 'Slavia', price: 1000000, description: 'A stylish sedan' },
    ];

    const updatedStock = updatedCarStock.map((car) => {
      const bookedCount = storedBookings.filter(b => b.carId === car.id).length;
      return {
        ...car,
        remaining: car.stock - bookedCount,
      };
    });

    setCarStock(updatedStock);
  }, []);

  return (
    <div className="staff-dashboard-container">
      <h2 className="staff-dashboard-title">Staff Dashboard</h2>

      <div className="staff-car-list">
        {carStock.map((car) => (
          <div key={car.id} className="staff-car-card">
            <h3 className="staff-car-name">{car.name} {car.modelName}</h3>
            <p><strong>Remaining Stock:</strong> {car.remaining}</p>
            <p><strong>Price:</strong> ₹{car.price}</p>
            <p><strong>Description:</strong> {car.description}</p>
          </div>
        ))}
      </div>

      <div className="staff-booking-list">
        <h3 className="staff-booking-title">Bookings</h3>
        {bookings.length === 0 ? (
          <p className="staff-no-bookings">No bookings yet.</p>
        ) : (
          bookings.map((booking, index) => (
            <div key={index} className="staff-booking-item">
              <p><strong>Car:</strong> {carStock.find(car => car.id === booking.carId)?.name}</p>
              <p><strong>Customer Name:</strong> {booking.customerName}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Address:</strong> {booking.address}</p>
              <p><strong>Payment Method:</strong> {booking.paymentMethod}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StaffDashboard;
