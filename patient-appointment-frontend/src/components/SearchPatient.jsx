import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PatientsList.css'; 
import PatientsList from './PatientsList';

const SearchPatient = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/patients/');
        setPatients(response.data);
        setFilteredPatients(response.data);
      } catch (err) {
        console.error('Error fetching patients:', err);
        setError('Error fetching patients');
      }
    };

    fetchPatients();
  }, []);

  const handleSearch = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    const filtered = patients.filter(patient =>
      patient[1] && patient[1].toLowerCase().includes(value.toLowerCase()),
    );
    setFilteredPatients(filtered);
  };

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
  };

  const handleAppointment = () => {
    setShowAppointmentModal(true);
  };

  const handleBookAppointment = async () => {
    if (selectedPatient) {
      try {
        const response = await axios.put(`http://127.0.0.1:8000/patients/${selectedPatient[0]}`, {
          ...selectedPatient,
          appointment: selectedDateTime,
        });
        const updatedPatient = response.data;

        setPatients((prevPatients) =>
          prevPatients.map((patient) =>
            patient.id === updatedPatient.id ? updatedPatient : patient
          )
        );

        setSelectedPatient(updatedPatient);
        handleCloseModal();
      } catch (err) {
        console.error('Error booking appointment:', err);
        setError('Error booking appointment');
      }
    }
  };

  const handleCloseModal = () => {
    setShowAppointmentModal(false);
  };


  return (
    <div>
      <h1>Search Patient</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <table className="patients-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient[0]}>
              <td>{patient[1]}</td>
              <td>
                <button className="view-details-btn" onClick={() => handleViewDetails(patient)}>
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedPatient && (
        <div className="patient-card">
          <h2>Patient Details</h2>
          <p><strong>Name:</strong> {selectedPatient[1]}</p>
          <p><strong>Gender:</strong> {selectedPatient[2]}</p>
          <p><strong>Age:</strong> {selectedPatient[3]}</p>
          <p><strong>Mobile No:</strong> {selectedPatient[4]}</p>
          <p><strong>Email:</strong> {selectedPatient[5]}</p>
          {selectedPatient[6] ? (
            <p><strong>Appointment:</strong> {selectedPatient[6]}</p>
          ) : (
            <p>
              <strong>Appointment:</strong>{' '}
              <button className="view-details-btn" onClick={handleAppointment}>Create Appointment</button>
            </p>
          )}
          <button className="close-details-btn" onClick={() => setSelectedPatient(null)}>
            Close Details
          </button>
        </div>
      )}
      {showAppointmentModal && (
        <div className="appointment-modal">
          <h2>Book Appointment</h2>
          <label>Select Date and Time:</label>
          <input
            type="datetime-local"
            value={selectedDateTime}
            onChange={(e) => setSelectedDateTime(e.target.value)}
          />
          <div className="modal-buttons">
            <button className="confirm-btn" onClick={handleBookAppointment}>Confirm</button>
            <button className="cancel-btn" onClick={handleCloseModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPatient;
