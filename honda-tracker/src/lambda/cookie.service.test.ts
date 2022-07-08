import { cookieService } from './cookie.service';

describe('CookieService', () => {
  describe('getSessionIdFromCookie', () => {
    it('should return abc', () => {
      const cookieString = 'mode=extreme;sessionId=abc;theme=dark';

      const sessionId = cookieService.getSessionIdFromCookie(cookieString);

      expect(sessionId).toBe('abc');
    });

    it('should return empty string', () => {
      const cookieString = 'mode=extreme;theme=dark';

      const sessionId = cookieService.getSessionIdFromCookie(cookieString);

      expect(sessionId).toBe('');
    });
  });
});
