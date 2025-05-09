import React, { useState, useEffect } from 'react';
import cars from './cars';

const CarDetails = ({ selectedCar }) => {
  const [bookingDone, setBookingDone] = useState(false);
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');

  useEffect(() => {
    // Check if this car is already booked by the user
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const isBooked = bookings.some((booking) => booking.carId === selectedCar.id);
    if (isBooked) {
      setBookingDone(true);
    }
  }, [selectedCar]);

  const handleBooking = () => {
    const currentDate = new Date();
    const booking = {
      carId: selectedCar.id,
      customerName: "Demo User", // Change this to logged-in user name if applicable
      date: currentDate.toISOString().split('T')[0],
      time: currentDate.toTimeString().split(' ')[0].slice(0, 5),
      address,
      paymentMethod,
    };

    // Save the booking to localStorage
    const existingBookings = JSON.parse(localStorage.getItem('bookings')) || [];
    existingBookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(existingBookings));

    setBookingDone(true);
  };

  return (
    <div className="p-4">
      {/* Show car details */}
      <h2 className="text-xl font-bold">{selectedCar.name} {selectedCar.modelName}</h2>
      <p>{selectedCar.description}</p>
      <p><strong>Price:</strong> ₹{selectedCar.price}</p>

      {/* Booking Form */}
      {!bookingDone ? (
        <div className="mt-6 space-y-4">
          <textarea
            className="w-full border rounded p-2"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <select
            className="w-full border rounded p-2"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Cash">Cash</option>
            <option value="UPI">UPI</option>
          </select>
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
            onClick={handleBooking}
          >
            Confirm Booking
          </button>
        </div>
      ) : (
        <div className="mt-4 text-green-600 font-semibold">
          ✅ Booking Confirmed! Staff will contact you soon.
        </div>
      )}
    </div>
  );
};

export default CarDetails;
