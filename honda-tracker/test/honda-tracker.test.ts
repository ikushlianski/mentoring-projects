import { Lambdas } from '../lib/types';
import { mergeLambdas } from '../lib/utils';

describe('Honda Tracker Stack', () => {
  describe('mergeLambdas', () => {
    it('should merge two maps into one', () => {
      const map1 = new Map([
        ['key1map1', 1],
        ['key2map1', 2],
      ]) as unknown as Lambdas;

      const map2 = new Map([
        ['key1map2', 3],
        ['key2map2', 4],
      ]) as unknown as Lambdas;

      const merged = mergeLambdas([map1, map2]);

      expect(merged.get('key1map1')).toBe(1);
      expect(merged.get('key2map1')).toBe(2);
      expect(merged.get('key1map2')).toBe(3);
      expect(merged.get('key2map2')).toBe(4);
    });
  });
});
