CREATE DATABASE ConnectMsSQL
USE ConnectMsSQL

create table saturday(
ID int primary key identity(1,1) not null,
[U.Time] varchar(50) not null,
[T.Id]  varchar(50) not null,
[T.Name]  varchar(50) not null,
[T.Address]  varchar(50) not null,
[T.Time]  varchar(50) not null,
st  varchar(50) not null,
);

create table sunday(
ID int primary key identity(1,1) not null,
[U.Time] varchar(50) not null,
[T.Id]  varchar(50) not null,
[T.Name]  varchar(50) not null,
[T.Address]  varchar(50) not null,
[T.Time]  varchar(50) not null,
st  varchar(50) not null,
);

create table monday(
ID int primary key identity(1,1) not null,
[U.Time] varchar(50) not null,
[T.Id]  varchar(50) not null,
[T.Name]  varchar(50) not null,
[T.Address]  varchar(50) not null,
[T.Time]  varchar(50) not null,
st  varchar(50) not null,
);

create table tuesday(
ID int primary key identity(1,1) not null,
[U.Time] varchar(50) not null,
[T.Id]  varchar(50) not null,
[T.Name]  varchar(50) not null,
[T.Address]  varchar(50) not null,
[T.Time]  varchar(50) not null,
st  varchar(50) not null,
);

create table wednesday(
ID int primary key identity(1,1) not null,
[U.Time] varchar(50) not null,
[T.Id]  varchar(50) not null,
[T.Name]  varchar(50) not null,
[T.Address]  varchar(50) not null,
[T.Time]  varchar(50) not null,
st  varchar(50) not null,
);

create table thurseday(
ID int primary key identity(1,1) not null,
[U.Time] varchar(50) not null,
[T.Id]  varchar(50) not null,
[T.Name]  varchar(50) not null,
[T.Address]  varchar(50) not null,
[T.Time]  varchar(50) not null,
st  varchar(50) not null,
);

create table friday(
ID int primary key identity(1,1) not null,
[U.Time] varchar(50) not null,
[T.Id]  varchar(50) not null,
[T.Name]  varchar(50) not null,
[T.Address]  varchar(50) not null,
[T.Time]  varchar(50) not null,
st  varchar(50) not null,
);

Alter login sa with password = '123456'

Alter login sa enable

Select * from saturday