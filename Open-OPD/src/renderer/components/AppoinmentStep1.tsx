import Channels from 'Channels';
import React, { useEffect } from 'react';
import Appointment from 'renderer/types/Appointment';

interface SearchResponse {
  d_id: number;
  name: string;
  speciality: string;
  consultation_fee: number;
}

function AppoinmentStep1({
  goNext,
  appointment,
  setAppointment,
}: {
  goNext: () => void;
  appointment: Appointment;
  setAppointment: React.Dispatch<React.SetStateAction<Appointment>>;
}) {
  const [doctors, setDoctors] = React.useState<SearchResponse[]>([]);

  useEffect(() => {
    window.electron.ipcRenderer.on(Channels.SEARCH_DOCTOR_RESPONSE, (res) => {
      console.log(res);
      setDoctors((res as Array<Array<SearchResponse>>)[0]);
    });

    return () => {
      window.electron.ipcRenderer.remove(Channels.SEARCH_DOCTOR_RESPONSE);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    window.electron.ipcRenderer.sendMessage(Channels.SEARCH_DOCTOR_REQUEST, [
      { token: e.target.value },
    ]);
  };

  const chooseDoctor = (res: SearchResponse) => {
    setAppointment((a) => ({
      ...a,
      d_id: res.d_id,
      d_name: res.name,
      d_speaciality: res.speciality,
      consultation_fee: res.consultation_fee,
    }));
  };

  return (
    <div className="p-10">
      <div className="flex">
        <input
          type="text"
          placeholder="Doctor name"
          className="input w-4/12"
          onChange={(e) => handleChange(e)}
        />
        <button type="button" className="btn ml-2">
          Search
        </button>
      </div>
      <div className="flex flex-col gap-1 my-5 max-h-96">
        {doctors.map((d) => (
          <div
            className={`flex justify-between ${
              appointment.d_id === d.d_id ? 'bg-gray-300' : ' bg-base-300'
            }  p-5 rounded-xl`}
            key={d.d_id}
          >
            <div className="flex flex-col">
              <span>Dr. {d.name}</span>
              <span className="text-xs text-gray-500">{d.speciality}</span>
            </div>
            <button
              type="button"
              className="btn btn-info"
              onClick={() => chooseDoctor(d)}
            >
              Choose
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="btn btn-success"
        onClick={goNext}
        disabled={appointment.d_id === undefined}
      >
        Next
      </button>
    </div>
  );
}

export default AppoinmentStep1;
