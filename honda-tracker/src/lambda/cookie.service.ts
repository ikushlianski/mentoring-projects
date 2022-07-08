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

  makeCookie = (key: string, value: string) => {
    return `${key}=${value}`;
  };
}

export const cookieService = new CookieService();
