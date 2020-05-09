import { describe, it } from 'mocha';
import { expect } from 'chai';
import {
  binaryInsert, generate,
} from '../../../../@shared/utils/arrays';
import { randomBetween } from '../../../../@shared/utils/math';

const expectJSONequal = (actual, expected) => expect(JSON.stringify(actual, null, 2)).to.deep.equal(JSON.stringify(expected, null, 2));

describe('Shared | Unit | Utils | arrays', () => {
  it('binaryInsert()', () => {
    expect(
      binaryInsert([0], -1, (v) => v)
    ).to.deep.equal([
      -1, 0
    ]);

    expect(
      binaryInsert([0], 1, (v) => v)
    ).to.deep.equal([
      0, 1
    ]);

    expect(
      binaryInsert([0, 2], -1, (v) => v)
    ).to.deep.equal([
      -1, 0, 2
    ]);

    expect(
      binaryInsert([0, 2], 1, (v) => v)
    ).to.deep.equal([
      0, 1, 2
    ]);

    expect(
      binaryInsert([0, 2], 3, (v) => v)
    ).to.deep.equal([
      0, 2, 3
    ]);

    expect(
      binaryInsert([0.05, 0.71], 0.95, (v) => v)
    ).to.deep.equal([
      0.05, 0.71, 0.95
    ]);

    expect(
      binaryInsert([0, 1, 2], 1, (v) => v)
    ).to.deep.equal([
      0, 1, 1, 2
    ]);

    expect(
      binaryInsert([0, 2, 4, 6, 8], 5, (v) => v)
    ).to.deep.equal([
      0, 2, 4, 5, 6, 8
    ]);

    expect(
      binaryInsert([0, 2, 4, 6, 8], 9, (v) => v)
    ).to.deep.equal([
      0, 2, 4, 6, 8, 9
    ]);
  });

  it('binaryInsert() [random]', () => {
    const RANDOM_BOUNDS = [
      [0, 0],
      [0, 1],
      [-1, 0],
      [-1, 1],
      [0, 2],
      [-2, 2],
      [-99, 99],
      [-9999, 9999],
    ];

    const randomRoundBetween = (a, b) => Math.round(randomBetween(a, b)) || 0;

    // Test generator
    const testsForSize = (size) => {
      for(let i = 0; i < RANDOM_BOUNDS.length; i++) {
        const bounds = RANDOM_BOUNDS[i];
        const input = generate(size, i => randomRoundBetween(bounds[0], bounds[1]))
          .sort((a, b) => a - b);
        const entry = randomRoundBetween(bounds[0], bounds[1]);
        const expected = [...input, entry].sort((a, b) => a - b);
        const actual = binaryInsert(input, entry, v => v);

        expect(actual).to.deep.equal(expected);
      }
    };

    testsForSize(1);
    testsForSize(2);
    testsForSize(3);
    testsForSize(4);
    testsForSize(5);

    for (let i = 0; i < 10; i++) {
      const size = randomRoundBetween(6, 100);
      testsForSize(size);
    }
  });
});