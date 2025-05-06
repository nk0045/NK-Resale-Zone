// CarDetails.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import cars from './cars'; // Adjust the path if your cars.js is in another folder
import BookingForm from "./BookingForm";
const CarDetails = () => {
  const { id } = useParams();
  const car = cars.find(c => c.id.toString() === id);

  if (!car) return <h2 style={{ color: "#001858" }}>Car not found</h2>;

  return (
    <>
    <BookingForm carName={car.name} />
      <div className="full-page">
      <div className="checkout-box">
        <h2>{car.name}</h2>
        <img src={car.image} alt={car.name} style={{ width: '100%', borderRadius: '12px', marginBottom: '1rem' }} />
        <p><strong>Brand:</strong> {car.brand}</p>
        <p><strong>Price:</strong> ₹{car.price.toLocaleString()}</p>
        <p><strong>Description:</strong> {car.description || 'A reliable second-hand car in great condition.'}</p>
      </div>
    </div>
    
    </>
    

  );
};

export default CarDetails;
