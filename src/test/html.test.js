import { describe, expect, it } from '@jest/globals';
import { stats } from '../lib/html';

describe('html', () => {
  describe('stats', () => {
    it('should return a template for stats object', () => {
      const numbers = [1, 2, 3, 4];
      const input = {
        filename: '1.txt',
        numbers,
        stats: { sum: 10 },
      };
      const result = stats(input);
      expect(result).toEqual(`<article>
  <h2>Niðurstöður fyrir 1.txt</h2>
  <section>
    <h3>Töluleg greining</h3>
    <dl>
      <dt>Summa</dt>
      <dd>10</dd>
    </dl>
  </section>
  <section>
    <h3>Allar tölur</h3>
    <code><pre>1
2
3
4</pre></code>
  </section>
</article>`);
    });
  });
});
