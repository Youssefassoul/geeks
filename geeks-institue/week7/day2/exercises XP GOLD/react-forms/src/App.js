import React, { useState } from "react";

function UserForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // show in console
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
    });
    setSubmitted(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <h1>Welcome!</h1>
          <p>Please provide your information below.</p>

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <br />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
          <br />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <br />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <br />

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <h2>
            {formData.lastName}, {formData.firstName}
          </h2>
          <p>{formData.phone}</p>
          <p>{formData.email}</p>
          <button onClick={handleReset}>Reset</button>
        </div>
      )}
    </div>
  );
}

export default UserForm;
