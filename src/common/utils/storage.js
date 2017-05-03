import { hasLocalStorage } from '../utils/windowUtils';
import each from 'lodash/each';
import keys from 'lodash/keys';

export default {
  has(key) {
    if (hasLocalStorage()) {
      return localStorage[key] !== undefined;
    }

    return false;
  },

  get(key) {
    if (hasLocalStorage()) {
      return localStorage[key];
    }

    return '';
  },

  save(items) {
    if (hasLocalStorage()) {
      each(keys(items), key => {
        localStorage[key] = items[key];
      });
    }
  },

  remove(key) {
    if (hasLocalStorage()) {
      localStorage.removeItem(key);
    }
  }
};
