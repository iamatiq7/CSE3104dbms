import mssql, { RequestError } from 'mssql';
import Channels from '../src/Channels';
import { DELETE_RECEPTIONIST } from '../queries/queries';

export default async function deleteReceptionist(
  pool: mssql.ConnectionPool,
  event: Electron.IpcMainEvent,
  args?: any
) {
  const request = new mssql.Request(pool);
  request
    .query(DELETE_RECEPTIONIST(args[0].u_id as number, args[0].r_id as number))
    .then((res) => {
      console.log('Rows affected: ', res.rowsAffected);
      if (!res.rowsAffected[0]) {
        event.sender.send(Channels.ERROR, ['Failed to delete receptionist']);
        return '';
      }
      event.sender.send(Channels.DELETE_RECEPTIONIST_RESPONSE, [res.recordset]);
      return '';
    })
    .catch((err) => {
      console.error(err);
      event.sender.send(Channels.ERROR, ['Failed to delete receptionist']);
      event.sender.send(Channels.ERROR, [err?.message]);
    });
}
