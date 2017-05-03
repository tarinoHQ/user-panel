import { TOKEN_EXPIRED } from '../constants/ActionTypes';
const TOKEN_EXPIRE_STATUS = 2;
const TOKEN_INVALID_STATUS = 3;

export const tokenExpiredAction = () => ({ type: TOKEN_EXPIRED });

export function isTokenExpired(status) {
  if (status === TOKEN_EXPIRE_STATUS ||
      status === TOKEN_INVALID_STATUS) {
    return true;
  }

  return false;
}
