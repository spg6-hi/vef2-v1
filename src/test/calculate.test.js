import { describe, expect, it } from '@jest/globals';
import { calculate } from '../lib/calculator';

describe('calculator', () => {
  describe('calculate', () => {
    it('should return null for invalid inputs', () => {
      expect(calculate('')).toEqual(null);
      expect(calculate(null)).toEqual(null);
      expect(calculate(0)).toEqual(null);
      expect(calculate(false)).toEqual(null);
      expect(calculate({})).toEqual(null);
    });

    it('should return null for invalid inputs if array', () => {
      expect(calculate([true, null, 1])).toEqual(null);
      expect(calculate([1, 0, 'a'])).toEqual(null);
    });

    it('should return a correct sum', () => {
      expect(calculate([-1, 2, 3]).sum).toBe(4);
    });

    it('should return a correct min', () => {
      expect(calculate([-1, 2, 3]).min).toBe(-1);
    });

    it('should return a correct max', () => {
      expect(calculate([-1, 2, 3]).max).toBe(3);
    });

    it('should return a correct range', () => {
      expect(calculate([-1, 2, 3]).range).toBe(4);
    });

    it('should return a correct mean', () => {
      expect(calculate([-1, 2, 3]).mean).toBe(1.3333);
    });

    it('should return a correct median', () => {
      expect(calculate([1, 2, 3, 4, 5]).median).toBe(3);
      expect(calculate([1, 2, 3, 4]).median).toBe(2.5);
      expect(calculate([4, 3, 1, 2]).median).toBe(2.5);
      expect(calculate([4, 3, 1, 2]).median).toBe(2.5);
    });

    it('should return a correct standard dev', () => {
      expect(calculate([-10, 4, 6, 1, -3, 0, 1]).standardDeviation).toBe(
        5.2099
      );
    });

    it('should return a correct variance', () => {
      expect(calculate([-10, 4, 6, 1, -3, 0, 1]).variance).toBe(27.1429);
    });

    it('should return correct results for the empty set', () => {
      const empty = calculate([]);

      expect(empty.sum).toBe(0);
      expect(empty.min).toBeUndefined();
      expect(empty.max).toBeUndefined();
      expect(empty.range).toBeUndefined();
      expect(empty.mean).toBeUndefined();
      expect(empty.variance).toBeUndefined();
      expect(empty.median).toBeUndefined();
      expect(empty.standardDeviation).toBeUndefined();
    });
  });
});
