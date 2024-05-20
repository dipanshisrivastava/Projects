import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PatientsList.css'; // Make sure the path is correct

const PatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/patients/');
        setPatients(response.data);
      } catch (err) {
        console.error('Error fetching patients:', err);
        setError('Error fetching patients');
      }
    };

    fetchPatients();
  }, []);

  const handleViewDetails = (patient) => {
    setSelectedPatient(patient);
    if (patient.appointment) {
      setSelectedDateTime(patient.appointment);
    } else {
      setSelectedDateTime('');
    }
  };

  const handleAppointment = () => {
    setShowAppointmentModal(true);
  };

  const handleCloseModal = () => {
    setShowAppointmentModal(false);
  };

  const handleBookAppointment = () => {
    if (selectedPatient) {
      const updatedPatients = patients.map((patient) => {
        if (patient.name === selectedPatient.name) {
          return { ...patient, appointment: selectedDateTime };
        }
        return patient;
      });

      setPatients(updatedPatients);
      setSelectedPatient((prev) => ({ ...prev, appointment: selectedDateTime }));
      handleCloseModal();
    }
  };
  return (
    <div>
      <h1>Patients List</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table className="patients-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient, index) => (
            <tr key={index}>
              <td>{patient.name}</td>
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
          <p><strong>Name:</strong> {selectedPatient.name}</p>
          <p><strong>Gender:</strong> {selectedPatient.gender}</p>
          <p><strong>Age:</strong> {selectedPatient.age}</p>
          <p><strong>Mobile No:</strong> {selectedPatient.mobileNo}</p>
          <p><strong>Email:</strong> {selectedPatient.email}</p>
          {selectedPatient.appointment ? (
            <p><strong>Appointment:</strong> {selectedPatient.appointment}</p>
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

export default PatientsList;
