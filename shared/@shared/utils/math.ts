export function cycleNumberUp(index, limit) {
  index += 1;
  if(index > limit) {
    index = 0;
  }
  return index;
}

export function cycleNumberDown(index, limit) {
  index -= 1;
  if(index < 0) {
    index = limit;
  }
  return index;
}

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export function randomBetween(min, max) {
  let r = Math.random();
  let range = max - min;
  let val = range * r + min;
  return val;
}

export function roundToNearest(value, step) {
  return Math.round(value / step) * step;
}

// @TODO: finish & test
export const weighZeroes = (a, b) => {
  // @ts-ignore
  if (Object.is(-0, a) && Object.is(0, b)) {
    return -1;
  }

  // @ts-ignore
  if (Object.is(0, a) && Object.is(-0, b)) {
    return 1;
  }

  return 0;
};
