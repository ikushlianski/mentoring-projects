import { SessionId } from '../user/user.types';

export enum CookieKeys {
  SESSION_ID = 'sessionId',
}

export class CookieService {
  getSessionIdFromCookie = (sessionCookies: string): SessionId => {
    return sessionCookies
      .split(';')
      .reduce((acc: SessionId, cookieString) => {
        const [key, value] = cookieString.split('=');

        if (key === CookieKeys.SESSION_ID) {
          acc = value;
        }

        return acc;
      }, '');
  };
}

export const cookieService = new CookieService();
