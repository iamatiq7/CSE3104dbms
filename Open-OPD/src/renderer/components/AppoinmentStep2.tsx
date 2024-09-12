import Channels from 'Channels';
import React, { useEffect } from 'react';
import Appointment from 'renderer/types/Appointment';

interface DoctorTimetableResponse {
  time_id: number;
  t_day: number;
  t_from: number;
  t_to: number;
}

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

function AppoinmentStep2({
  goNext,
  goPrev,
  appointment,
  setAppointment,
}: {
  goNext: () => void;
  goPrev: () => void;
  appointment: Appointment;
  setAppointment: React.Dispatch<React.SetStateAction<Appointment>>;
}) {
  const [timetable, setTimetable] = React.useState<DoctorTimetableResponse[]>(
    []
  );

  useEffect(() => {
    window.electron.ipcRenderer.on(
      Channels.READ_DOCTOR_TIMETABLE_RESPONSE,
      (res) => {
        console.log(res);
        setTimetable((res as Array<Array<DoctorTimetableResponse>>)[0]);
      }
    );

    window.electron.ipcRenderer.sendMessage(
      Channels.READ_DOCTOR_TIMETABLE_REQUEST,
      [{ d_id: appointment.d_id }]
    );

    return () => {
      window.electron.ipcRenderer.remove(
        Channels.READ_DOCTOR_TIMETABLE_RESPONSE
      );
    };
  }, [appointment.d_id]);

  const chooseTime = (res: DoctorTimetableResponse) => {
    console.log('choosing time');
    setAppointment((a) => ({
      ...a,
      time_id: res.time_id,
      datetime: `${res.t_day}-${res.t_from}-${res.t_to}`,
    }));
  };

  return (
    <div className="p-10">
      <div className="overflow-x-auto my-5">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Weekday</th>
              <th>Time Slots (24hrs)</th>
            </tr>
          </thead>
          <tbody>
            {timetable.map((res) => (
              <tr key={res.time_id}>
                <th>{WEEKDAYS[res.t_day]}</th>
                <td>
                  <div className="flex flex-wrap gap-2">
                    <button
                      className={`badge badge-lg ${
                        appointment.datetime ===
                        `${res.t_day}-${res.t_from}-${res.t_to}`
                          ? 'badge-primary'
                          : ''
                      }`}
                      type="button"
                      onClick={() => chooseTime(res)}
                    >
                      {res.t_from} - {res.t_to}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between">
        <button type="button" className="btn btn-success" onClick={goPrev}>
          Prev
        </button>
        <button
          type="button"
          className="btn btn-success"
          onClick={goNext}
          disabled={appointment?.datetime === undefined}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default AppoinmentStep2;
