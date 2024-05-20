import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Header from './components/Header';
import CreatePatient from './components/CreatePatient';
import PatientsList from './components/PatientsList';
import SearchPatient from './components/SearchPatient';


function App() {

  return (
    <Router>
      <>
      <Header/>
      <Routes>
        <Route path="/app" element={<App />} />
        <Route path="/create-patient" element={<CreatePatient />} />
        <Route path="/patients-list" element={<PatientsList />} />
        <Route path="/search-patient" element={<SearchPatient />} />
      </Routes>
      </>
    </Router>      
  );
}

export default App;
