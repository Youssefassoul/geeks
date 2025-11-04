import React from "react";

function FormComponent({ data, handleChange, handleSubmit }) {
  return (
    <div>
      <h2 className="fw-bold text-center mb-4">✈️ Travel Preferences Form</h2>

      <form onSubmit={handleSubmit} className="row g-3">
        {/* Personal Info */}
        <div className="col-md-4">
          <label className="form-label">First Name</label>
          <input
            className="form-control"
            type="text"
            name="firstName"
            value={data.firstName}
            onChange={handleChange}
            placeholder="Enter first name"
            required
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Last Name</label>
          <input
            className="form-control"
            type="text"
            name="lastName"
            value={data.lastName}
            onChange={handleChange}
            placeholder="Enter last name"
            required
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Age</label>
          <input
            className="form-control"
            type="number"
            name="age"
            value={data.age}
            onChange={handleChange}
            placeholder="Your age"
            required
          />
        </div>

        {/* Gender */}
        <div className="col-md-6">
          <label className="form-label d-block">Gender</label>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="Male"
              checked={data.gender === "Male"}
              onChange={handleChange}
            />
            <label className="form-check-label">Male</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="Female"
              checked={data.gender === "Female"}
              onChange={handleChange}
            />
            <label className="form-check-label">Female</label>
          </div>
        </div>

        {/* Destination */}
        <div className="col-md-6">
          <label className="form-label">Destination</label>
          <select
            className="form-select"
            name="destination"
            value={data.destination}
            onChange={handleChange}
            required
          >
            <option value="">-- Choose destination --</option>
            <option value="Germany">Germany</option>
            <option value="Norway">Norway</option>
            <option value="North Pole">North Pole</option>
            <option value="South Pole">South Pole</option>
          </select>
        </div>

        {/* Dietary Restrictions */}
        <div className="col-12">
          <label className="form-label d-block">Dietary Restrictions</label>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              name="nutsFree"
              checked={data.nutsFree}
              onChange={handleChange}
            />
            <label className="form-check-label">Nuts free</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              name="lactoseFree"
              checked={data.lactoseFree}
              onChange={handleChange}
            />
            <label className="form-check-label">Lactose free</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="checkbox"
              name="vegan"
              checked={data.vegan}
              onChange={handleChange}
            />
            <label className="form-check-label">Vegan</label>
          </div>
        </div>

        {/* Submit */}
        <div className="col-12 text-center mt-3">
          <button type="submit" className="btn btn-primary px-5 fw-bold">
            Submit
          </button>
        </div>
      </form>

      {/* Display section */}
      <div className="mt-5 p-4 bg-dark text-white rounded">
        <h4 className="fw-bold mb-3">Entered Information</h4>
        <p><strong>Name:</strong> {data.firstName} {data.lastName}</p>
        <p><strong>Age:</strong> {data.age}</p>
        <p><strong>Gender:</strong> {data.gender}</p>
        <p><strong>Destination:</strong> {data.destination}</p>
        <p><strong>Dietary restrictions:</strong></p>
        <ul>
          <li>Nuts free: {data.nutsFree ? "✅ Yes" : "❌ No"}</li>
          <li>Lactose free: {data.lactoseFree ? "✅ Yes" : "❌ No"}</li>
          <li>Vegan: {data.vegan ? "✅ Yes" : "❌ No"}</li>
        </ul>
      </div>
    </div>
  );
}

export default FormComponent;