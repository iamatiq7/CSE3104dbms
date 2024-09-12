import mssql, { RequestError } from 'mssql';
import Channels from '../src/Channels';
import { LOGIN_QUERY } from '../queries/queries';

export default async function login(
  pool: mssql.ConnectionPool,
  event: Electron.IpcMainEvent,
  args?: any
) {
  console.log(args);
  const phoneNumber = args[0].identifier as string;
  const passcode = args[0].password as string;
  const userType = args[0].userType as string;

  const request = new mssql.Request(pool);
  request
    .query(LOGIN_QUERY(phoneNumber, passcode, userType))
    .then((res) => {
      console.log('Rows affected: ', res.rowsAffected);
      if (!res.rowsAffected[0]) {
        event.sender.send(Channels.ERROR, ['Invalid credentials']);
        return '';
      }
      event.sender.send(Channels.LOGIN_RESPONSE, [res.recordset]);
      return '';
    })
    .catch((err: RequestError) => {
      console.error(err.message);
      event.sender.send(Channels.ERROR, [err.message]);
    });
}
