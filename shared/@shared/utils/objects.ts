import rfdc from '@shared/wrappers/rfdc';

export function pathsFor(path: string) {
  return path
    .split('.')
    .map((part, i, paths) => paths.slice(0, i + 1).join('.'));
}

export function exists(source: object, path: string): boolean {
  if(path.indexOf('.') < 0) {
    return source.hasOwnProperty(path);
  } else {
    let parts = path.split('.');
    let [head, tail] = [ parts[0], parts.slice(1).join('.') ];
    return exists(source[head], tail);
  }
}

export function retrieve(source: object, path: string) {
  if(path.indexOf('.') < 0) {
    return source[path]
  } else {
    let parts = path.split('.');
    return retrieve(source[parts[0]], parts.slice(1).join('.'));
  }
}

export function assign(source: object, path: string, data: any) {
  if(path.indexOf('.') < 0) {
    return source[path] = data;
  } else {
    let parts = path.split('.');
    return assign(source[parts[0]], parts.slice(1).join('.'), data);
  }
}

/**
 * Deeply clones an object, also assign any overwrite/mREQUEST objects given. Can use paths.
 */
export function clone<T extends object>(object: T, ...mREQUESTs: object[]): T {
  return mREQUESTs.reduce((result, overwrite) => {
    Object.keys(overwrite).forEach(path => {
      const value = overwrite[path];
      assign(result, path, value);
    });
    return result;
  }, rfdc(object));
}