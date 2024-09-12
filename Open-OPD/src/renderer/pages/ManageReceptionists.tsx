import Channels from 'Channels';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from 'renderer/components/BackButton';
import Receptionist from 'renderer/types/Receptionist';

interface ReceptionistResponse extends Receptionist {
  u_id: number;
}

function ManageReceptionists() {
  const [receptionists, setReceptionists] = useState<
    Array<ReceptionistResponse>
  >([]);

  useEffect(() => {
    window.electron.ipcRenderer.on(
      Channels.READ_RECEPTIONIST_RESPONSE,
      (res) => {
        console.log('got receptionists');
        console.log(res);
        setReceptionists((res as Array<Array<ReceptionistResponse>>)[0]);
      }
    );

    console.log('sending read receptionists');
    window.electron.ipcRenderer.sendMessage(
      Channels.READ_RECEPTIONIST_REQUEST,
      []
    );

    window.electron.ipcRenderer.on(
      Channels.DELETE_RECEPTIONIST_RESPONSE,
      () => {
        window.electron.ipcRenderer.sendMessage(
          Channels.READ_RECEPTIONIST_REQUEST,
          []
        );
      }
    );
    return () => {
      window.electron.ipcRenderer.remove(Channels.READ_RECEPTIONIST_RESPONSE);
      window.electron.ipcRenderer.remove(Channels.DELETE_RECEPTIONIST_RESPONSE);
    };
  }, []);

  const navigate = useNavigate();

  const deleteReceptionist = (u_id: number, r_id: number) => {
    window.electron.ipcRenderer.sendMessage(
      Channels.DELETE_RECEPTIONIST_REQUEST,
      [{ u_id, r_id }]
    );
  };

  return (
    <div>
      <BackButton />
      <div className="p-5">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl">Receptionists</h1>
          <button
            onClick={() => navigate('/manager/manage/receptionists/add')}
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
                <th className="bg-base-300">Desk</th>
                <th className="bg-base-300">Gender</th>
                <th className="bg-base-300">Phone</th>
                <th className="bg-base-300">Salary/month</th>
                {/* <th className="bg-base-300">Status</th> */}
                <th className="bg-base-300">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {receptionists.map((r, _indx) => (
                <tr key={`r-${(Math.random() * 1000).toString()}`}>
                  <th>{_indx + 1}</th>
                  <td>
                    {r.first_name} {r.last_name}
                  </td>
                  <td>{r.desk_no}</td>
                  <td>{r.gender}</td>
                  <td>{r.phone_number}</td>
                  <td>{r.salary}</td>
                  <td className="flex gap-1 items-center justify-center">
                    <button
                      type="button"
                      className="btn btn-xs btn-error"
                      onClick={() => deleteReceptionist(r.u_id, r.r_id)}
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

export default ManageReceptionists;
