import React, { useState } from 'react';
import axios from 'axios';

const CreatePatient = () => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [appointment, setAppointment] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !gender || !age || !mobileNo || !email) {
      setError('All fields are required');
      return;
    }

    if (age <= 0) {
      setError('Age must be a positive number');
      return;
    }

    const mobileNoPattern = /^[6-9]\d{9}$/;
    if (!mobileNoPattern.test(mobileNo)) {
      setError('Enter a valid mobile number');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/patients/', {
        name,
        gender,
        age: parseInt(age), // Convert age to integer
        mobileNo,
        email,
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
      setMobileNo(value);
    }
  };

  // const fetchPatients = async () => {
  //   try {
  //     const response = await axios.get('http://localhost:8000/patients/');
  //     setPatients(response.data);
  //   } catch (error) {
  //     console.error('Error fetching patients:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchPatients();
  // }, []);

  return (<form onSubmit={handleSubmit}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Gender:
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <br />
      <label>
        Age:
        <input type="number" value={age} onChange={(e) => setAge(e.target.value)} min="1" />
      </label>
      <br />
      <label>
        Mobile Number:
        <input
          type="tel"
          value={mobileNo}
          onChange={handleMobileNoChange}
          pattern="[6-9]{1}[0-9]{9}"
          title="Enter a valid mobile number"
        />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>

    // list
  );
};

export default CreatePatient;
