import { ReduxAction } from '@client/types';
import { ReduxActionTypes } from '@client/actions/ReduxActions';

type OnNextCallback = {
  triggerType: string,
  callback: (action: ReduxAction) => any,
}

export type ReduxState = {
  callbacks: OnNextCallback[],
};

const defaultState: ReduxState = {
  callbacks: [],
};

export const ReduxReducer = (state: ReduxState = defaultState, action: ReduxAction) => {
  switch (action.type) {
    case ReduxActionTypes.ON_NEXT:
      return {
        callbacks: [...state.callbacks, {
          triggerType: action.triggerType,
          callback: action.callback,
        }],
      };
    default:
      return {
        callbacks: state.callbacks.filter(_ => {
          if(_.triggerType !== action.type) {
            return true;
          } else {
            setTimeout(() => _.callback(action), 1);
            return false;
          }
        })
      }
  }
};