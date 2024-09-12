import { ipcMain } from 'electron';
import mssql from 'mssql';
import createAppoinments from '../../controllers/createAppoinment';
import createDoctor from '../../controllers/createDoctor';
import createReceptionist from '../../controllers/createReceptionist';
import deleteDoctor from '../../controllers/deleteDoctor';
import deleteReceptionist from '../../controllers/deleteReceptionist';
import login from '../../controllers/login';
import readDoctor from '../../controllers/readDoctor';
import readDoctorTimetable from '../../controllers/readDoctorTimetable';
import readReceptionist from '../../controllers/readReceptionist';
import searchDoctor from '../../controllers/searchDoctor';
import searchPatient from '../../controllers/searchPatient';
import Channels from '../Channels';

const eventAssigner = (pool: mssql.ConnectionPool) => {
  ipcMain.on(Channels.LOGIN_REQUEST, async (event, args) => {
    await login(pool, event, args);
  });

  ipcMain.on(Channels.CREATE_RECEPTIONIST_REQUEST, async (event, args) => {
    await createReceptionist(pool, event, args);
  });

  ipcMain.on(Channels.READ_RECEPTIONIST_REQUEST, async (event, args) => {
    await readReceptionist(pool, event, args);
  });

  ipcMain.on(Channels.DELETE_RECEPTIONIST_REQUEST, async (event, args) => {
    await deleteReceptionist(pool, event, args);
  });

  // Doctor

  ipcMain.on(Channels.CREATE_DOCTOR_REQUEST, async (event, args) => {
    await createDoctor(pool, event, args);
  });

  ipcMain.on(Channels.READ_DOCTOR_REQUEST, async (event, args) => {
    await readDoctor(pool, event, args);
  });

  ipcMain.on(Channels.DELETE_DOCTOR_REQUEST, async (event, args) => {
    await deleteDoctor(pool, event, args);
  });

  ipcMain.on(Channels.SEARCH_DOCTOR_REQUEST, async (event, args) => {
    await searchDoctor(pool, event, args);
  });

  ipcMain.on(Channels.READ_DOCTOR_TIMETABLE_REQUEST, async (event, args) => {
    await readDoctorTimetable(pool, event, args);
  });

  ipcMain.on(Channels.SEARCH_PATIENT_REQUEST, async (event, args) => {
    await searchPatient(pool, event, args);
  });

  ipcMain.on(Channels.CREATE_APPOINTMENT_REQUEST, async (event, args) => {
    await createAppoinments(pool, event, args);
  });
};

export default eventAssigner;
