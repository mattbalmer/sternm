import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from '@client/reducers';
import { clone } from '@shared/utils/objects';
// import * as SampleReducer from '@client/reducers/SampleReducer';

const serverState = window['__STATE__'] || {};
delete window['__STATE__'];

const localState = {
  // sample: SampleReducer.loadState(),
};

const defaultState = clone(localState, serverState);

export const store = createStore(reducers, defaultState,
  applyMiddleware(
    thunkMiddleware,
    createLogger(),
  )
);

store.subscribe(() => {
  const state = store.getState();
  // SampleReducer.saveState(state.sample);
});