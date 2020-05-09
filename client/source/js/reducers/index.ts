import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { UserReducer, UserState } from '@client/reducers/UserReducer';
import { AppstateReducer, AppstateState } from '@client/reducers/AppstateReducer';
import { ReduxReducer, ReduxState } from '@client/reducers/ReduxReducer';

export type StoreState = {
  routing: any;
  redux: ReduxState;
  appstate: AppstateState;
  users: UserState;
};

const reducers = combineReducers({
  routing: routerReducer,
  redux: ReduxReducer,
  appstate: AppstateReducer,
  users: UserReducer,
});

export default reducers;