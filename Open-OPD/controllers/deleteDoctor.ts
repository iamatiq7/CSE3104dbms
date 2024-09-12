import mssql, { RequestError } from 'mssql';
import Channels from '../src/Channels';
import { DELETE_DOCTOR } from '../queries/queries';

export default async function deleteDoctor(
  pool: mssql.ConnectionPool,
  event: Electron.IpcMainEvent,
  args?: any
) {
  const request = new mssql.Request(pool);
  request
    .query(DELETE_DOCTOR(args[0].u_id as number, args[0].d_id as number))
    .then((res) => {
      console.log('Rows affected: ', res.rowsAffected);
      if (!res.rowsAffected[0]) {
        event.sender.send(Channels.ERROR, ['Failed to delete doctor']);
        return '';
      }
      event.sender.send(Channels.DELETE_DOCTOR_RESPONSE, [res.recordset]);
      return '';
    })
    .catch((err) => {
      console.error(err);
      event.sender.send(Channels.ERROR, ['Failed to delete doctor']);
      event.sender.send(Channels.ERROR, [err?.message]);
    });
}
