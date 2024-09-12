enum Channels {
  READ_USERS_REQUEST = 'read-users-request',
  READ_USERS_RESPONSE = 'read-users-response',

  LOGIN_REQUEST = 'login-request',
  LOGIN_RESPONSE = 'login-response',

  CREATE_RECEPTIONIST_REQUEST = 'create-receptionist-request',
  CREATE_RECEPTIONIST_RESPONSE = 'create-receptionist-response',

  READ_RECEPTIONIST_REQUEST = 'read-receptionist-request',
  READ_RECEPTIONIST_RESPONSE = 'read-receptionist-response',

  DELETE_RECEPTIONIST_REQUEST = 'delete-receptionist-request',
  DELETE_RECEPTIONIST_RESPONSE = 'delete-receptionist-response',

  CREATE_DOCTOR_REQUEST = 'create-doctor-request',
  CREATE_DOCTOR_RESPONSE = 'create-doctor-response',

  READ_DOCTOR_REQUEST = 'read-doctor-request',
  READ_DOCTOR_RESPONSE = 'read-doctor-response',

  DELETE_DOCTOR_REQUEST = 'delete-doctor-request',
  DELETE_DOCTOR_RESPONSE = 'delete-doctor-response',

  SEARCH_DOCTOR_REQUEST = 'search-doctor-request',
  SEARCH_DOCTOR_RESPONSE = 'search-doctor-response',

  READ_DOCTOR_TIMETABLE_REQUEST = 'read-doctor-timetable-request',
  READ_DOCTOR_TIMETABLE_RESPONSE = 'read-doctor-timetable-response',

  SEARCH_PATIENT_REQUEST = 'search-patient-request',
  SEARCH_PATIENT_RESPONSE = 'search-patient-response',

  CREATE_APPOINTMENT_REQUEST = 'create-appointment-request',
  CREATE_APPOINTMENT_RESPONSE = 'create-appointment-response',

  ERROR = 'error',
}

export default Channels;
