export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function isEmpty(source: object) {
  return source ? Object.keys(source).length === 0 : true;
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
    source[path] = data;
  } else {
    let parts = path.split('.');
    return assign(source[parts[0]], parts.slice(1).join('.'), data);
  }
}

export function pathsFor(path: string) {
  return path
    .split('.')
    .map((part, i, paths) => paths.slice(0, i + 1).join('.'));
}

export function mapMongoList(list: any[]) {
  return list.reduce((map, item, i) => {
    return (Object as any).assign(map, {
      [item._id]: item,
    })
  }, {})
}

export function extendReducer(...reducers) {
  let reducerCount = reducers.length;
  let lastReducer = reducers[reducerCount - 1];
  let defaultState = typeof lastReducer === 'function' ? undefined : lastReducer;
  if(defaultState) {
    reducers = reducers.slice(0, reducerCount - 1);
  }
  return function(state, action) {
    state = state || defaultState;
    let newState = state;
    let i = 0;
    while(newState == state && i < reducerCount) {
      newState = reducers[i](state, action);
      i++;
    }
    return newState;
  };
}

export function bindAll(context, functionNames) {
  functionNames.forEach(func => {
    context[func] = context[func].bind(context);
  });
}