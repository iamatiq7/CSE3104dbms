export default interface User {
  u_id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  user_type: 'receptionist' | 'doctor' | 'manager';
  user_key: number;
  nid: string;
  joining_date: Date;
  age?: number;
  gender: 'male' | 'female' | 'other';
}
