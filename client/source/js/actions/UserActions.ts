import UserClient from '@client/clients/UserClient';
import { createActionKeys, createActionStages } from '@client/utils/redux';

export const PREFIX = `@User`;
export const UserActionTypes = createActionKeys(PREFIX, {
  FETCH_SELF: createActionStages('FETCH_SELF'),
  FETCH_ALL: createActionStages('FETCH_ALL'),
  FETCH_SOME: createActionStages('FETCH_SOME'),
});

export const UserActions = {
  requestSelf_: () => ({
    type: UserActionTypes.FETCH_SELF.REQUEST,
  }),
  receiveSelf_: (self) => ({
    type: UserActionTypes.FETCH_SELF.SUCCESS,
    user: self,
  }),
  fetchSelf: () => (dispatch) => {
    dispatch(UserActions.requestSelf_());
    UserClient.fetchMe()
      .then(user => {
        dispatch(UserActions.receiveSelf_(user));
      });
  },
  
  requestAllUsers_: () => ({
    type: UserActionTypes.FETCH_ALL.REQUEST,
  }),
  receiveAllUsers_: (users) => ({
    type: UserActionTypes.FETCH_ALL.SUCCESS,
    users,
  }),
  fetchAllUsers: () => (dispatch) => {
    dispatch(UserActions.requestAllUsers_());
    UserClient.fetchAll()
      .then(users => {
        dispatch(UserActions.receiveAllUsers_(users));
      });
  },

  fetchSome: (ids: string[]) => (dispatch) => {
    dispatch({
      type: UserActionTypes.FETCH_SOME.REQUEST,
      ids,
    });
    return UserClient.fetchAll({
      _id: ids,
    })
      .then(users => {
        dispatch({
          type: UserActionTypes.FETCH_SOME.SUCCESS,
          users,
        });
        return users;
      });
  },
};