import { ReduxAction } from '@client/types';

export type AppstateState = {
};

const defaultState: AppstateState = {
};

export const AppstateReducer = (state: AppstateState = defaultState, action: ReduxAction) => {
  switch (action.type) {
    default:
      return state
  }
};
