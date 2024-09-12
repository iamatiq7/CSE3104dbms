import mssql, { RequestError } from 'mssql';
import Channels from '../src/Channels';
import { SEARCH_DOCTOR } from '../queries/queries';

export default async function searchDoctor(
  pool: mssql.ConnectionPool,
  event: Electron.IpcMainEvent,
  args?: any
) {
  const request = new mssql.Request(pool);
  request
    .query(SEARCH_DOCTOR(args[0].token as string))
    .then((res) => {
      console.log('Rows affected: ', res.rowsAffected);
      if (!res.rowsAffected[0]) {
        event.sender.send(Channels.ERROR, ['Found no doctor']);
        return '';
      }
      event.sender.send(Channels.SEARCH_DOCTOR_RESPONSE, [res.recordset]);
      return '';
    })
    .catch((err) => {
      console.error(err);
      event.sender.send(Channels.ERROR, ['Failed to read doctor']);
      event.sender.send(Channels.ERROR, [err?.message]);
    });
}
