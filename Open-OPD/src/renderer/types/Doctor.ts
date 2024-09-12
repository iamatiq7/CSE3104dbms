import User from './User';

export default interface Doctor extends User {
  d_id: number;
  speciality: string;
  consultation_fee: number;
}
