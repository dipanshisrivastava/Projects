import React, { useState } from 'react';
import axios from 'axios';
import './CreatePatient.css';  // Ensure the path is correct

const CreatePatient = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [mobile_no, setMobile_no] = useState('');
  const [email, setEmail] = useState('');
  const [appointment, setAppointment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !gender || !age || !mobile_no || !email) {
      setError('All fields are required');
      return;
    }

    if (age <= 0) {
      setError('Age must be a positive number');
      return;
    }

    const mobileNoPattern = /^[6-9]\d{9}$/;
    if (!mobileNoPattern.test(mobile_no)) {
      setError('Enter a valid mobile number');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/patients/', {
        name,
        gender,
        age: parseInt(age),
        mobile_no,
        email,
        appointment,
      });

      console.log(response.data);
      setError('');
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while submitting the form');
    }
  };

  const handleMobileNoChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setMobile_no(value);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="patient-form">
      {error && <p className="error">{error}</p>}
      <label className="form-label">
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-input" />
      </label>
      
      <label className="form-label">
        Gender:
        <select value={gender} onChange={(e) => setGender(e.target.value)} className="form-input">
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>

      <label className="form-label">
        Age:
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} min="1" className="form-input" />
      </label>
      
      <label className="form-label">
        Mobile Number:
        <input
          type="tel"
          value={mobile_no}
          onChange={handleMobileNoChange}
          pattern="[6-9]{1}[0-9]{9}"
          title="Enter a valid mobile number"
          className="form-input"
        />
      </label>
      
      <label className="form-label">
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
      </label>
      
      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
};

export default CreatePatient;
