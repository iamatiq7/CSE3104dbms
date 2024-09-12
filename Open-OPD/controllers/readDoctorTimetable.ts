import mssql, { RequestError } from 'mssql';
import Channels from '../src/Channels';
import { READ_DOCTOR_TIMETABLE } from '../queries/queries';

export default async function readDoctorTimetable(
  pool: mssql.ConnectionPool,
  event: Electron.IpcMainEvent,
  args?: any
) {
  const request = new mssql.Request(pool);
  request
    .query(READ_DOCTOR_TIMETABLE(args[0].d_id as number))
    .then((res) => {
      console.log('Rows affected: ', res.rowsAffected);
      if (!res.rowsAffected[0]) {
        event.sender.send(Channels.ERROR, ['Found no doctor timetable']);
        return '';
      }
      event.sender.send(Channels.READ_DOCTOR_TIMETABLE_RESPONSE, [
        res.recordset,
      ]);
      return '';
    })
    .catch((err) => {
      console.error(err);
      event.sender.send(Channels.ERROR, ['Failed to read doctor timetable']);
      event.sender.send(Channels.ERROR, [err?.message]);
    });
}
