import mssql, { RequestError } from 'mssql';
import Channels from '../src/Channels';
import { SEARCH_PATIENT } from '../queries/queries';

export default async function searchPatient(
  pool: mssql.ConnectionPool,
  event: Electron.IpcMainEvent,
  args?: any
) {
  const request = new mssql.Request(pool);
  request
    .query(SEARCH_PATIENT(args[0].phoneNumber as string))
    .then((res) => {
      console.log('Rows affected: ', res.rowsAffected);
      if (!res.rowsAffected[0]) {
        event.sender.send(Channels.ERROR, ['Found no patient']);
        return '';
      }
      event.sender.send(Channels.SEARCH_PATIENT_RESPONSE, [res.recordset]);
      return '';
    })
    .catch((err) => {
      console.error(err);
      event.sender.send(Channels.ERROR, ['Failed to read patient']);
      event.sender.send(Channels.ERROR, [err?.message]);
    });
}
