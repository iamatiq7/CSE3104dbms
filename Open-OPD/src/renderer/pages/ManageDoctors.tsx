import Channels from 'Channels';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from 'renderer/components/BackButton';
import Doctor from 'renderer/types/Doctor';

interface DoctorResponse extends Doctor {
  u_id: number;
}

function ManageDoctors() {
  const [doctors, setdoctors] = useState<Array<DoctorResponse>>([]);

  useEffect(() => {
    window.electron.ipcRenderer.on(Channels.READ_DOCTOR_RESPONSE, (res) => {
      console.log('got doctors');
      console.log(res);
      setdoctors((res as Array<Array<DoctorResponse>>)[0]);
    });

    console.log('sending read doctors');
    window.electron.ipcRenderer.sendMessage(Channels.READ_DOCTOR_REQUEST, []);

    window.electron.ipcRenderer.on(Channels.DELETE_DOCTOR_RESPONSE, () => {
      window.electron.ipcRenderer.sendMessage(Channels.READ_DOCTOR_REQUEST, []);
    });
    return () => {
      window.electron.ipcRenderer.remove(Channels.READ_DOCTOR_RESPONSE);
      window.electron.ipcRenderer.remove(Channels.DELETE_DOCTOR_RESPONSE);
    };
  }, []);

  const navigate = useNavigate();

  const deleteDoctor = (u_id: number, d_id: number) => {
    window.electron.ipcRenderer.sendMessage(Channels.DELETE_DOCTOR_REQUEST, [
      { u_id, d_id },
    ]);
  };

  return (
    <div>
      <BackButton />
      <div className="p-5">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl">doctors</h1>
          <button
            onClick={() => navigate('/manager/manage/doctors/add')}
            type="button"
            className="btn btn-primary"
          >
            Add
          </button>
        </div>
        <div className="overflow-x-auto mt-5 max-h-96 border">
          <table className="table w-full">
            <thead>
              <tr className="text-center">
                <th className="bg-base-300">#</th>
                <th className="bg-base-300">Name</th>
                <th className="bg-base-300">Gender</th>
                <th className="bg-base-300">Phone</th>
                <th className="bg-base-300">Speciality</th>
                <th className="bg-base-300">Fee</th>
                <th className="bg-base-300">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {doctors.map((d, _indx) => (
                <tr key={`d-${(Math.random() * 1000).toString()}`}>
                  <th>{_indx + 1}</th>
                  <td>
                    Dr. {d.first_name} {d.last_name}
                  </td>
                  <td>{d.gender}</td>
                  <td>{d.phone_number}</td>
                  <td>{d.speciality}</td>
                  <td>{d.consultation_fee}</td>
                  <td className="flex gap-1 items-center justify-center">
                    <button
                      type="button"
                      className="btn btn-xs btn-error"
                      onClick={() => deleteDoctor(d.u_id, d.d_id)}
                    >
                      delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageDoctors;
