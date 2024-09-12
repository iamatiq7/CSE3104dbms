/* eslint-disable import/no-named-as-default-member */
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import ManagerDashboard from './pages/ManagerDashboard';
import ManagerStats from './pages/ManagerStats';
import ErrorProvider from './contexts/ErrorProvider';
import LoginPage from './pages/LoginPage';
import ManageReceptionists from './pages/ManageReceptionists';
import ManagerAdd from './pages/ManagerAdd';
import ManageDoctors from './pages/ManageDoctors';
import ReceptionistDashboard from './pages/ReceptionistDashboard';
import ReceptionistAppoinment from './pages/ReceptionistAppoinment';
// import Layout from './components/Layout';

export default function App() {
  return (
    // <Layout>
    <ErrorProvider>
      <div className="bg-base-200 min-h-screen">
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            {/* Manager */}
            <Route path="/manager" element={<ManagerDashboard />} />
            <Route path="/manager/stats" element={<ManagerStats />} />
            <Route
              path="/manager/manage/receptionists"
              element={<ManageReceptionists />}
            />
            <Route
              path="/manager/manage/receptionists/add"
              element={<ManagerAdd table="receptionist" />}
            />

            <Route path="/manager/manage/doctors" element={<ManageDoctors />} />
            <Route
              path="/manager/manage/doctors/add"
              element={<ManagerAdd table="doctor" />}
            />
            {/* Receptionist */}
            <Route path="/receptionist" element={<ReceptionistDashboard />} />
            <Route
              path="/receptionist/appointment"
              element={<ReceptionistAppoinment />}
            />
          </Routes>
        </Router>
      </div>
    </ErrorProvider>
    // </Layout>
  );
}
