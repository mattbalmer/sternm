import { User, ReduxAction } from '@client/types';
import { UserActionTypes } from '@client/actions/UserActions';
import UserClient from '@client/clients/UserClient';

export type UserState = {
  users: {
    [key: string]: User;
  },
  myId?: string;
  isLoggedIn: boolean;
  isAdmin: boolean;
};

const defaultState: UserState = {
  users: {},
  isLoggedIn: false,
  isAdmin: false,
};

export const UserReducer = (state: UserState = defaultState, action: ReduxAction) => {
  switch (action.type) {
    case UserActionTypes.FETCH_SOME.SUCCESS:
    case UserActionTypes.FETCH_ALL.SUCCESS:
      return {
        ...state,
        users: {
          ...state.users,
          ...action.users,
        }
      };
    case UserActionTypes.FETCH_SELF.SUCCESS:
      return action.user ? {
        users: {
          ...state.users,
          [action.user._id]: action.user
        },
        myId: action.user._id,
        isLoggedIn: true,
        isAdmin: UserClient.isAdmin(action.user),
      } : {
        ...state,
        myId: null,
        isLoggedIn: false,
        isAdmin: false,
      };
    default:
      return state
  }
};