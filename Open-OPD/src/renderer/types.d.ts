import Manager from './types/Manager';
import User from './types/User';

declare global {
  interface Window {
    user?: User;
    manager?: Manager;
    isLoggedin?: boolean;
  }
}

export {};
