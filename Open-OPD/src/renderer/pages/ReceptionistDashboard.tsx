import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from 'renderer/components/LogoutButton';

function ReceptionistDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-5 min-h-screen">
      <LogoutButton />
      <div className="grid grid-cols-2 w-max place-content-center gap-10 mx-auto ">
        <button
          className="btn w-64 h-24"
          type="button"
          onClick={() => navigate('/receptionist/appointment')}
        >
          Book an Appoinment
        </button>
      </div>
    </div>
  );
}

export default ReceptionistDashboard;
