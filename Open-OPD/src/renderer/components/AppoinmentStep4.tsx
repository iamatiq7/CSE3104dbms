import Channels from 'Channels';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Appointment from 'renderer/types/Appointment';

const WEEKDAYS = [
  '',
  'Saturday',
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
];

function AppoinmentStep4({
  goPrev,
  appointment,
  setAppointment,
}: {
  goPrev: () => void;
  appointment: Appointment;
  setAppointment: React.Dispatch<React.SetStateAction<Appointment>>;
}) {
  const navigate = useNavigate();
  useEffect(() => {
    window.electron.ipcRenderer.on(
      Channels.CREATE_APPOINTMENT_RESPONSE,
      (res) => {
        console.log(res);
        navigate('/receptionist');
      }
    );

    return () => {
      window.electron.ipcRenderer.remove(Channels.CREATE_APPOINTMENT_RESPONSE);
    };
  });
  const print = () => {
    window.electron.ipcRenderer.sendMessage(
      Channels.CREATE_APPOINTMENT_REQUEST,
      [{ ...appointment }]
    );
  };

  return (
    <div>
      <div className="flex flex-col gap-12 justify-center items-center p-24">
        Dr. {appointment.d_name} <br />
        {appointment.d_speaciality} <br />
        -------------------------------------------- <br />@
        {appointment.datetime} <br />
        -------------------------------------------- <br />
        Patient Name: {appointment.p_name} <br />
        Patient Age: {appointment.p_age} <br />
        Patient Gender: {appointment.p_gender} <br />
        <button type="button" className="btn" onClick={() => print()}>
          Print
        </button>
      </div>
    </div>
  );
}

export default AppoinmentStep4;
