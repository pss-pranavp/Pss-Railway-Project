import './App.css';
import React, { useState } from 'react';
import Dashboard from "./pages/DashBoard";
import ShopData from "./pages/assessment1/ShopData";
import WheelSheet from "./pages/assessment2/WheelSheet";

import DetailedRecordOfPressedOffWheels from './pages/assessment1/DetailedRecordOfPressedOffWheels';
function App() {
  const [selectedTab, setSelectedTab] = useState("home"); 
  
  
  // export default data;
  
  return (
    <div className="homepage">
      <Dashboard
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      {selectedTab === "home" ? (
       <DetailedRecordOfPressedOffWheels/>
      ) : (
        <WheelSheet />
      )}
     
    </div>
  );
}

export default App;
