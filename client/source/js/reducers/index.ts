import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { UserReducer, UserState } from '@client/reducers/UserReducer';
import { AppstateReducer, AppstateState } from '@client/reducers/AppstateReducer';
import { ReduxReducer, ReduxState } from '@client/reducers/ReduxReducer';
import { LobbyReducer, LobbyState } from '@client/reducers/LobbyReducer';

export type StoreState = {
  routing: any;
  redux: ReduxState;
  appstate: AppstateState;
  users: UserState;
  lobbies: LobbyState;
};

const reducers = combineReducers({
  routing: routerReducer,
  redux: ReduxReducer,
  appstate: AppstateReducer,
  users: UserReducer,
  lobbies: LobbyReducer,
});

export default reducers;