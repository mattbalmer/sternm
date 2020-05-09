import { Lobby, ReduxAction } from '@client/types';
import { LobbyActionTypes } from '@client/actions/LobbyActions';

export type LobbyState = {
  lobbies: {
    [key: string]: Lobby;
  },
  currentLobby: string;
};

const defaultState: LobbyState = {
  lobbies: {},
  currentLobby: null,
};

export const LobbyReducer = (state: LobbyState = defaultState, action: ReduxAction) => {
  switch (action.type) {
    case LobbyActionTypes.FETCH_ALL.SUCCESS:
      return {
        ...state,
        lobbies: {
          ...state.lobbies,
          ...action.lobbies,
        }
      };
    case LobbyActionTypes.CONNECT.SUCCESS:
      return {
        ...state,
        currentLobby: action.id,
      };
    case LobbyActionTypes.LOBBY_UPDATED:
    case LobbyActionTypes.FETCH_ONE.SUCCESS:
    case LobbyActionTypes.CREATE.SUCCESS:
    case LobbyActionTypes.ADD_USER.SUCCESS:
    case LobbyActionTypes.REMOVE_USER.SUCCESS:
      return {
        ...state,
        lobbies: {
          ...state.lobbies,
          [action.lobby._id]: action.lobby,
        }
      };
    case LobbyActionTypes.DELETE.SUCCESS:
      const { [action.lobby._id]: removed, ...lobbies } = state.lobbies;
      return {
        ...state,
        lobbies: lobbies,
      };
    default:
      return state
  }
};