export interface AuthCredentials {
  type: 'login' | 'register';
  email: string;
  password: string;
}
