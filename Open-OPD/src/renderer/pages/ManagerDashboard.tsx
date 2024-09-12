import { useNavigate } from 'react-router-dom';
import LogoutButton from 'renderer/components/LogoutButton';

function ManagerDashboard() {
  const navigate = useNavigate();
  return (
    <div className="p-5 min-h-screen">
      <LogoutButton />
      <div className="grid grid-cols-2 w-max place-content-center gap-10 mx-auto">
        <button
          className="btn w-64 h-24"
          type="button"
          onClick={() => navigate('/manager/stats')}
        >
          Show Stats
        </button>
        <button
          className="btn w-64 h-24"
          type="button"
          onClick={() => navigate('/manager/manage/receptionists')}
        >
          Manage Receptionists
        </button>
        <button
          className="btn w-64 h-24"
          type="button"
          onClick={() => navigate('/manager/manage/doctors')}
        >
          Manage Doctors
        </button>
        <button className="btn w-64 h-24" type="button" disabled>
          Manage Nurses
        </button>
      </div>
    </div>
  );
}

export default ManagerDashboard;
