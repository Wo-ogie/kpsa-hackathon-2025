import React from 'react';
import { Outlet } from 'react-router-dom';

const PatientLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <Outlet />
    </div>
  );
};

export default PatientLayout; 