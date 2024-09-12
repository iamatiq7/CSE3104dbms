import mssql, { RequestError } from 'mssql';
import Channels from '../src/Channels';
import { CREATE_RECEPTIONIST } from '../queries/queries';

export default async function createReceptionist(
  pool: mssql.ConnectionPool,
  event: Electron.IpcMainEvent,
  args?: any
) {
  console.log(args);
  const phoneNumber = args[0].phoneNumber as string;
  const firstName = args[0].firstName as string;
  const lastName = args[0].lastName as string;
  const age = args[0].age as string;
  const gender = args[0].gender as string;
  const nid = args[0].nid as string;
  const passcode = args[0].passcode as string;
  const joiningDate = args[0].joiningDate as string;
  const userType = args[0].userType as string;
  const salary = args[0].salary as number;
  const deskNumber = args[0].deskNo as number;

  const request = new mssql.Request(pool);
  request
    .query(
      CREATE_RECEPTIONIST(
        phoneNumber,
        firstName,
        lastName,
        age,
        gender,
        passcode,
        joiningDate,
        nid,
        userType,
        salary,
        deskNumber
      )
    )
    .then((res) => {
      console.log('Rows affected: ', res.rowsAffected);
      if (!res.rowsAffected[0]) {
        event.sender.send(Channels.ERROR, ['Failed to create receptionist']);
        return '';
      }
      event.sender.send(Channels.CREATE_RECEPTIONIST_RESPONSE, [res.recordset]);
      return '';
    })
    .catch((err) => {
      console.error(err);
      event.sender.send(Channels.ERROR, ['Failed to create receptionist']);
      event.sender.send(Channels.ERROR, [err?.message]);
    });
}
