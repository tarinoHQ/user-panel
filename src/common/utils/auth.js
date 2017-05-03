import storage from './storage';

export default {
  isLoggedIn() {
    return storage.has('token');
  }
};
