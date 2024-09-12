import mssql, { RequestError } from 'mssql';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import Channels from '../src/Channels';
import { CREATE_APPOINTMENT } from '../queries/queries';

export default async function createAppoinments(
  pool: mssql.ConnectionPool,
  event: Electron.IpcMainEvent,
  args?: any
) {
  const request = new mssql.Request(pool);
  request
    .query(
      CREATE_APPOINTMENT(
        args[0].time_id as number,
        args[0].d_id as number,
        args[0].p_id as number
      )
    )
    .then((res) => {
      console.log('Rows affected: ', res.rowsAffected);
      if (!res.rowsAffected[0]) {
        event.sender.send(Channels.ERROR, ['Failed to create appointment']);
        return '';
      }

      const doc = new PDFDocument();
      doc.pipe(
        fs.createWriteStream(`output${Math.floor(Math.random() * 100000)}.pdf`)
      );
      doc.text(`
        Dr. ${args[0].d_name}
        ${args[0].d_speaciality}
        --------------------------------------------
        @ ${args[0].datetime}
        --------------------------------------------
        Patient Name: ${args[0].p_name}
        Patient Age: ${args[0].p_age}
        Patient Gender: ${args[0].p_gender}
      `);
      doc.end();

      event.sender.send(Channels.CREATE_APPOINTMENT_RESPONSE, [res.recordset]);
      return '';
    })
    .catch((err) => {
      console.error(err);
      event.sender.send(Channels.ERROR, ['Failed to crete appointment']);
      event.sender.send(Channels.ERROR, [err?.message]);
    });
}
