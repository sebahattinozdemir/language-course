export interface User {
  id: number;
  email: string;
  password: string;
  registrationDate: string;
  token?: string | undefined; 
}