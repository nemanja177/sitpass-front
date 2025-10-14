import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import FacilitySearchPage from './pages/FacilitySearchPage';
import FacilityForm from './pages/FacilityCreationPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FacilitySearchPage />} />
        <Route path="/create-facility" element={<FacilityForm />} />
      </Routes>
    </Router>
  );
}

export default App;
