import { describe, expect, it } from '@jest/globals';
import { parse } from '../lib/parser';

describe('parser', () => {
  describe('parse', () => {
    it('should return empty for invalid inputs', async () => {
      expect(parse('')).toEqual([]);
      expect(parse(null)).toEqual([]);
      expect(parse(0)).toEqual([]);
      expect(parse(false)).toEqual([]);
      expect(parse({})).toEqual([]);
    });

    it('should parse a valid list with 1 number', async () => {
      const input = '123';
      const result = parse(input);
      expect(result).toEqual([123]);
    });

    it('should parse the empty input', async () => {
      const input = '';
      const result = parse(input);
      expect(result).toEqual([]);
    });

    it('should parse a valid list with 1 number and whitespace', async () => {
      const input = '123\n\n\n';
      const result = parse(input);
      expect(result).toEqual([123]);
    });

    it('should parse a valid list with 3 numbers', async () => {
      const input = '123\n456\n789\n';
      const result = parse(input);
      expect(result).toEqual([123, 456, 789]);
    });

    it('should parse a valid list with an icelandic float number', async () => {
      const input = '123,456';
      const result = parse(input);
      expect(result).toEqual([123.456]);
    });

    it('should parse an icelandic float and thousand separated number', async () => {
      const input = '123.456,789';
      const result = parse(input);
      expect(result).toEqual([123456.789]);
    });

    it('should not parse invalid data', async () => {
      const input = '100aa\naa10';
      const result = parse(input);
      expect(result).toEqual([]);
    });

    it('should parse scientific notation', async () => {
      const input = '6.4e3\n6.4E3';
      const result = parse(input);
      expect(result).toEqual([6400, 6400]);
    });

    it('should not parse scientific notation lookalikes', async () => {
      const input = '6xe1';
      const result = parse(input);
      expect(result).toEqual([]);
    });

    it('should parse scientific notation, formatted, "normal", junk together', async () => {
      const input = 'aaa\n6.4e3\n10\n123.456\n123.456,789';
      const result = parse(input);
      expect(result).toEqual([6400, 10, 123456, 123456.789]);
    });

    it('should parse negative numbers', async () => {
      const input = 'aaa\n-6.4e3\n-10\n-123.456\n-123.456,789';
      const result = parse(input);
      expect(result).toEqual([-6400, -10, -123456, -123456.789]);
    });
  });
});
