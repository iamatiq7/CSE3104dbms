import User from './User';

export default interface Receptionist extends User {
  r_id: number;
  salary: number;
  desk_no: number;
}
