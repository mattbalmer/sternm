interface ArrayConstructor {
  from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): Array<U>;
  from<T>(arrayLike: ArrayLike<T>): Array<T>;
}

interface generateCallback {
  (i: number): any
}

export function generate(size: number, value: generateCallback|any) {
  let callback = typeof value === 'function'
    ? (v, i) => value(i)
    : () => value;

  // @ts-ignore
  return Array.from({ length: size }, callback);
}

export function randomEntry(array: any[]) {
  let i = Math.floor(Math.random() * array.length);

  return array[i];
}

export function closest(array: number[], target) {
  return array.reduce(function(prev, curr) {
      return (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev);
  });
}

export function binaryInsert<T = any>(array: T[], entry: T, valueFor: (T) => number): T[] {
  let lowerBound = 0;
  let higherBound = array.length;
  let middle = 0;
  const entryValue: number = valueFor(entry);

  while(higherBound - lowerBound > 0) {
    middle = Math.floor((higherBound - lowerBound) / 2) + lowerBound;
    const queryEntry = array[middle];
    const queryValue: number = valueFor(queryEntry);

    // @ts-ignore
    if (entryValue < queryValue) {
      higherBound = Math.max(middle, lowerBound);
      middle = Math.floor((higherBound - lowerBound) / 2) + lowerBound;
    }

    // @ts-ignore
    if (entryValue > queryValue) {
      lowerBound = Math.min(middle + 1, higherBound);
      middle = Math.floor((higherBound - lowerBound) / 2) + lowerBound;
    }

    if (entryValue === queryValue) {
      break;
    }
  }

  return [
    ...array.slice(0, middle),
    entry,
    ...array.slice(middle)
  ];
}

export function flatten<T = any>(array: any[]): T[] {
  return [].concat.apply([], array);
}

export function shuffle<A extends Array<any>>(array: A): A {
  let currentIndex: number = array.length;
  let temporaryValue;
  let randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function strip<T extends any>(array: T[], index: number, count: number = 1): T[] {
  return [
    ...array.slice(0, index),
    ...array.slice(index + count),
  ];
}