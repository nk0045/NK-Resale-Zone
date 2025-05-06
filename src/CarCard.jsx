// CarCard.jsx
import React, { useState } from 'react';

const CarCard = ({ car, addToCart }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="car-card">
      <img src={car.image} alt={car.name} className="car-image" />
      <h3>{car.name}</h3>
      <p><strong>Model:</strong> {car.modelName}</p>
      <p><strong>Price:</strong> ₹{car.price.toLocaleString()}</p>
      <p><strong>Years Used:</strong> {car.yearsUsed} year(s)</p>
      <button className="book-btn" onClick={() => addToCart(car)}>Book Now</button>
      <button className="details-btn" onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Hide Details" : "Show Details"}
      </button>

      {showDetails && (
        <div className="car-details">
          <p><strong>Engine:</strong> {car.engine}</p>
          <p><strong>Fuel Type:</strong> {car.fuelType}</p>
          <p><strong>Description:</strong> {car.description || "No description available."}</p>
        </div>
      )}
    </div>
  );
};

export default CarCard;
