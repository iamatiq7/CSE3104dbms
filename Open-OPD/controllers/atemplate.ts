// import mssql, { RequestError } from 'mssql';
// import Channels from '../src/Channels';
// import { INSERT_SUBJECT_QUERY } from '../queries/queries';

// export default async function addSubject(
//   pool: mssql.ConnectionPool,
//   event: Electron.IpcMainEvent,
//   args: any
// ) {
//   const subjectID = args[0];
//   const subjectNAME = args[1];
//   const request = new mssql.Request(pool);
//   request
//     .query(INSERT_SUBJECT_QUERY(subjectID, subjectNAME))
//     .then((res) => {
//       console.log('Rows affected: ', res.rowsAffected);
//       event.sender.send(Channels.SUBJECTS_ADDED, []);
//       return '';
//     })
//     .catch((err: RequestError) => {
//       let errMsg = 'Failed to add subject';
//       if (err.message.includes('PRIMARY KEY constraint')) {
//         errMsg = 'Subject already exists';
//       }
//       event.sender.send(Channels.SUBJECTS_ADDED_ERROR, [errMsg]);
//     });
// }
