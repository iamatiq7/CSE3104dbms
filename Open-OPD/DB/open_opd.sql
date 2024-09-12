
CREATE TABLE Users (
	u_id int primary key identity(1,1),
	phone_number varchar(11) unique,
	first_name varchar(50) not null,
	last_name varchar(50) not null,
	nid varchar(20) not null unique,
	age int,
	gender varchar(10) not null check (gender IN('male', 'female', 'other')),
	passcode varchar(50) not null check (LEN(passcode) > 6),
	joining_date date default (getdate()),
	user_type varchar(20) not null check (user_type IN('receptionist', 'doctor', 'manager')),
	user_key int not null
);

create unique index idx_phone
on Users(phone_number);

ALTER TABLE Users
ADD CONSTRAINT uq_user UNIQUE(user_type, user_key)

-- Manager --------------------------------------------------------------------
create table Manager (
	m_id int primary key identity(1, 1),
	designation varchar(50)
)

Begin Tran
INSERT INTO Manager (designation) VALUES('CEO')
INSERT INTO Users (phone_number, first_name, last_name, nid, age, gender, passcode, joining_date, user_type, user_key) 
VALUES('01521517500', 'Naimul', 'Islam', '4592526166', 22, 'male', '1234567', GETDATE(), 'manager', (select top 1 m_id from Manager order by m_id desc));
COMMIT
-- Receptionist ----------------------------------------------------------------
create table Receptionist (
	r_id int primary key identity(1,1),
	salary int check(salary > 0),
	desk_no int check(desk_no > 0),
	remaining_holidays int default 30
)

Begin Tran
INSERT INTO Receptionist 
(salary, desk_no) VALUES(30000, 1);
INSERT INTO Users (phone_number, first_name, last_name, nid, age, gender, passcode, joining_date, user_type, user_key) 
VALUES('01521517534', 'Intishar', 'Rahman', '4592356966', 22, 'male', '1234567', GETDATE(), 'receptionist', (select top 1 r_id from Receptionist order by r_id desc));
COMMIT

-- Doctor ------------------------------------------------------------------------
create table Doctor (
	d_id int primary key identity(1,1),
	speciality varchar(250),
	consultation_fee int not null,
)

Begin Tran
insert into Doctor (speciality, consultation_fee)
values('Retina Specialist', 700)
INSERT INTO Users (phone_number, first_name, last_name, nid, age, gender, passcode, joining_date, user_type, user_key) 
VALUES('01521517535', 'Shah-Noor', 'Hasan', '45546786966', 42, 'male', '1234567', GETDATE(), 'doctor', (select top 1 d_id from Doctor order by d_id desc));
COMMIT

-- Room ---------------------------------------------------------------------------
create table Room (
	room_id int primary key identity(1,1),
	room_no int unique not null,
)
insert into Room (room_no)
values(1)
insert into Room (room_no)
values(2)
insert into Room (room_no)
values(3)

-- DoctorRoom ---------------------------------------------------------------------------
create table DoctorRoom (
	dr_id int primary key identity(1,1),
	room_id int unique not null foreign key references Room(room_id),
	d_id int unique not null foreign key references Doctor(d_id)
)
insert into DoctorRoom (room_id, d_id)
values (3, 1)

-- Timetable -----------------------------------------------------------------------------
create table Timetable (
	time_id int primary key identity(1,1),
	t_day int not null check (t_day in (1, 2, 3, 4, 5, 6 ,7)),
	t_from int not null check (t_from between 0 and 24),
	t_to int not null check (t_to between 0 and 24)
)
ALTER TABLE Timetable
ADD CONSTRAINT valid_time check (t_to > t_from)

insert into Timetable (t_day, t_from, t_to)
values(1, 8, 12)
insert into Timetable (t_day, t_from, t_to)
values(1, 15, 19)
insert into Timetable (t_day, t_from, t_to)
values(2, 8, 12)
insert into Timetable (t_day, t_from, t_to)
values(2, 16, 18)
insert into Timetable (t_day, t_from, t_to)
values(3, 8, 12)
insert into Timetable (t_day, t_from, t_to)
values(4, 15, 19)
insert into Timetable (t_day, t_from, t_to)
values(5, 9, 12)
insert into Timetable (t_day, t_from, t_to)
values(6, 14, 17)

-- DoctorTimetable -----------------------------------------------------------------------
create table DoctorTimetable(
	dt_id int primary key identity(1,1),
	d_id int foreign key references Doctor(d_id),
	time_id int foreign key references Timetable(time_id),
)
ALTER TABLE DoctorTimetable
ADD CONSTRAINT uq_doctor_time unique(d_id, time_id)

insert into DoctorTimetable (d_id, time_id)
values(1, 2)
insert into DoctorTimetable (d_id, time_id)
values(3, 1)

-- Patient -----------------------------------------------------------------------
create table Patient(
	p_id int primary key identity(1,1),
	phone_number varchar(11) unique not null,
	name varchar(100) not null,
	gender varchar(10) not null check (gender IN('male', 'female', 'other')),
	age int not null,
	created_at date default (getdate())
)
create unique index idx_patient_phone
on Patient(phone_number);

insert into Patient (phone_number, name, gender, age)
values('01787774055', 'Jaheda Islam', 'female', 60)

-- Appointment ---------------------------------------------------------------------
create table Appoinment(
	a_id int primary key identity(1,1),
	a_time int not null foreign key references Timetable(time_id),
	a_by int not null foreign key references Doctor(d_id),
	a_for int not null foreign key references Patient(p_id),
	created_at date default (getdate())
)

insert into Appoinment (a_time, a_by, a_for)
values(1, 3, 1)