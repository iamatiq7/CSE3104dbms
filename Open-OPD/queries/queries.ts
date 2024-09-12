export const READ_USERS = `SELECT * FROM users`;
export const LOGIN_QUERY = (
  phone_number: string,
  passcode: string,
  userType: string
) => {
  switch (userType) {
    case 'Receptionist':
      return `
          SELECT first_name, last_name, age, gender, phone_number, user_type, user_key, joining_date, nid, u_id from Users
          INNER JOIN Receptionist ON Users.user_key = Receptionist.r_id
          WHERE phone_number = '${phone_number}' AND passcode = '${passcode}'
          `;
      break;
    case 'Doctor':
      break;
    case 'Manager':
      return `
          SELECT first_name, last_name, age, gender, phone_number, user_type, user_key, joining_date, nid, u_id from Users
          INNER JOIN Manager ON Users.user_key = Manager.m_id
          WHERE phone_number = '${phone_number}' AND passcode = '${passcode}'
          `;
      break;
    default:
      return '';
      break;
  }

  return '';
};

export const CREATE_RECEPTIONIST = (
  phone_number: string,
  first_name: string,
  last_name: string,
  age: string,
  gender: string,
  passcode: string,
  joining_date: string,
  nid: string,
  user_type: string,
  salary: number,
  desk_number: number
) =>
  `
Begin Tran
INSERT INTO Receptionist
(salary, desk_no) VALUES(${salary.toString()}, ${desk_number.toString()} );
INSERT INTO Users (phone_number, first_name, last_name, nid, age, gender, passcode, joining_date, user_type, user_key)
VALUES(
  '${phone_number}',
  '${first_name}',
  '${last_name}',
  '${nid}',
  ${age},
  '${gender}',
  '${passcode}',
  GETDATE(),
  'receptionist',
  (select top 1 r_id from Receptionist order by r_id desc)
  );
COMMIT
`;

export const READ_RECEPTIONIST = `
SELECT TOP 1000 u_id, r_id, first_name, last_name, gender, desk_no, phone_number, salary FROM Receptionist
INNER JOIN Users
ON Users.user_key = Receptionist.r_id
WHERE Users.user_type = 'receptionist'`;

export const DELETE_RECEPTIONIST = (u_id: number, r_id: number) =>
  `
Begin Tran
DELETE FROM Receptionist
WHERE r_id = ${r_id.toString()}
DELETE FROM Users
WHERE u_id = ${u_id.toString()}
COMMIT
`;

export const CREATE_DOCTOR = (
  phone_number: string,
  first_name: string,
  last_name: string,
  age: string,
  gender: string,
  passcode: string,
  nid: string,
  speciality: string,
  consultation_fee: number
) =>
  `
Begin Tran
insert into Doctor (speciality, consultation_fee)
values('${speciality}', ${consultation_fee})
INSERT INTO Users (phone_number, first_name, last_name, nid, age, gender, passcode, joining_date, user_type, user_key)
VALUES('${phone_number}', '${first_name}', '${last_name}', '${nid}', ${age}, '${gender}', '${passcode}', GETDATE(), 'doctor', (select top 1 d_id from Doctor order by d_id desc));
COMMIT
`;

export const READ_DOCTOR = `
SELECT TOP 1000 u_id, d_id, first_name, last_name, gender, phone_number, speciality, consultation_fee FROM Doctor
INNER JOIN Users
ON Users.user_key = Doctor.d_id
WHERE Users.user_type = 'doctor'`;

export const DELETE_DOCTOR = (u_id: number, d_id: number) =>
  `
Begin Tran
DELETE FROM Doctor
WHERE d_id = ${d_id.toString()}
DELETE FROM Users
WHERE u_id = ${u_id.toString()}
COMMIT
`;

export const SEARCH_DOCTOR = (token: string) =>
  `
select d_id, first_name + ' ' + last_name as name, speciality, consultation_fee from Doctor
inner join Users
on Doctor.d_id = Users.user_key
where user_type = 'doctor' and first_name + ' ' + last_name like '%${token}%';
`;

export const READ_DOCTOR_TIMETABLE = (d_id: number) =>
  `
select DoctorTimetable.time_id, t_day, t_from, t_to from DoctorTimetable
inner join Timetable
on DoctorTimetable.time_id = Timetable.time_id
where d_id = ${d_id.toString()};
`;

export const SEARCH_PATIENT = (phoneNumber: string) =>
  `
select p_id, phone_number, name, age, gender from Patient
where phone_number = '${phoneNumber}';
`;

export const CREATE_APPOINTMENT = (
  a_time: number,
  a_by: number,
  a_for: number
) =>
  `
insert into Appoinment (a_time, a_by, a_for)
values(${a_time.toString()}, ${a_by.toString()}, ${a_for.toString()});
`;
