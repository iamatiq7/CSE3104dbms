import mssql, { RequestError } from 'mssql';
import Channels from '../src/Channels';
import { READ_DOCTOR } from '../queries/queries';

export default async function readDoctor(
  pool: mssql.ConnectionPool,
  event: Electron.IpcMainEvent,
  args?: any
) {
  const request = new mssql.Request(pool);
  request
    .query(READ_DOCTOR)
    .then((res) => {
      console.log('Rows affected: ', res.rowsAffected);
      if (!res.rowsAffected[0]) {
        event.sender.send(Channels.ERROR, ['Found no doctor']);
        return '';
      }
      event.sender.send(Channels.READ_DOCTOR_RESPONSE, [res.recordset]);
      return '';
    })
    .catch((err) => {
      console.error(err);
      event.sender.send(Channels.ERROR, ['Failed to read doctor']);
      event.sender.send(Channels.ERROR, [err?.message]);
    });
}
