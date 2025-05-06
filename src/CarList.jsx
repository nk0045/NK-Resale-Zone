import React from "react";
import CarCard from "./CarCard";

const CarList = ({ cars, addToCart }) => {
  return (
    <div className="car-list fade-in">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} addToCart={addToCart} />
      ))}
    </div>
  );
};

export default CarList;