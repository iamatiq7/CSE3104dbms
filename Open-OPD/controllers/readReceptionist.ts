import mssql, { RequestError } from 'mssql';
import Channels from '../src/Channels';
import { READ_RECEPTIONIST } from '../queries/queries';

export default async function readReceptionist(
  pool: mssql.ConnectionPool,
  event: Electron.IpcMainEvent,
  args?: any
) {
  const request = new mssql.Request(pool);
  request
    .query(READ_RECEPTIONIST)
    .then((res) => {
      console.log('Rows affected: ', res.rowsAffected);
      if (!res.rowsAffected[0]) {
        event.sender.send(Channels.ERROR, ['Found no receptionist']);
        return '';
      }
      event.sender.send(Channels.READ_RECEPTIONIST_RESPONSE, [res.recordset]);
      return '';
    })
    .catch((err) => {
      console.error(err);
      event.sender.send(Channels.ERROR, ['Failed to read receptionist']);
      event.sender.send(Channels.ERROR, [err?.message]);
    });
}
