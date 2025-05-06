import React, { useState } from "react";

const BookingForm = ({ carName }) => {
  const [form, setForm] = useState({ name: "", phone: "", date: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Booking confirmed for ${carName} on ${form.date}`);
    setForm({ name: "", phone: "", date: "" });
  };

  return (
    <form className="p-4 border rounded shadow" onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold mb-4">Book a Test Drive</h2>
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        className="block w-full mb-3 p-2 border rounded"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        className="block w-full mb-3 p-2 border rounded"
        value={form.phone}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        className="block w-full mb-3 p-2 border rounded"
        value={form.date}
        onChange={handleChange}
        required
      />
      <button type="submit" className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-500">
        Book Now
      </button>
    </form>
  );
};

export default BookingForm;
