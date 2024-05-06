import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./pages/DashBoard";
import DetailedRecordOfPressedOffWheels from './pages/assessment1/DetailedRecordOfPressedOffWheels';
import WheelSheet from "./pages/assessment2/WheelSheet";
import LoginPage from './pages/LoginPage';
// import DashboardMechanical from './pages/DashboardMechanical';

function App() {
  return (
    <div>
      <Router>
        <div className="App" data-testid="AppWrapper">
          <Routes>
            <Route path="" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="" element={<DetailedRecordOfPressedOffWheels />} />
              <Route path="wheelSheet" element={<WheelSheet/>} />
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
