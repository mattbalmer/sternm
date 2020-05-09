import { describe, it } from 'mocha';
import { expect } from 'chai';
import { clone } from '@shared/utils/objects';

const expectJSONequal = (actual, expected) => expect(JSON.stringify(actual, null, 2)).to.deep.equal(JSON.stringify(expected, null, 2));

describe('Shared | Unit | Utils | objects', () => {
  it('clone() deeply clones', () => {
    const now = new Date();

    const input = {
      number: 123,
      date: now,
      nested: {
        str: 'a string',
        list: [1,2,3],
        more: {
          hello: 'world',
        },
      },
    };

    const output = clone(input);

    expect(output).to.deep.equal(input);

    output['number'] = 154;
    output['nested']['str'] = 'a different string!';
    output['nested']['more']['hello'] = 'another different string!';

    expect(input.number).to.deep.equal(123);
    expect(input.nested.str).to.deep.equal('a string');
    expect(input.nested.more.hello).to.deep.equal('world');
  });

  it('clone() applies mREQUESTs', () => {
    const now = new Date();

    const input = {
      number: 123,
      date: now,
      nested: {
        str: 'a string',
        list: [1,2,3],
        more: {
          hello: 'world',
        },
      },
      nested2: {
        foo: 'bar',
        bar: 'foo',
      },
    };

    const output = clone(input, {
      number: 154,
      'nested.str': 'a different string',
      'nested.list': [5,6,7],
      nested2: {
        'completely': 'overwritten'
      },
    });

    expect(output).to.deep.equal({
      ...input,
      number: 154,
      nested: {
        ...input.nested,
        str: 'a different string',
        list: [5,6,7],
      },
      nested2: {
        'completely': 'overwritten'
      },
    });

    const output2 = clone(input, {
      number: 154,
      nested2: {
        'completely': 'overwritten'
      },
    }, {
      'nested.str': 'a different string',
      'nested.list': [5,6,7],
    });

    expect(output).to.deep.equal({
      ...input,
      number: 154,
      nested: {
        ...input.nested,
        str: 'a different string',
        list: [5,6,7],
      },
      nested2: {
        'completely': 'overwritten'
      },
    });
  });
});