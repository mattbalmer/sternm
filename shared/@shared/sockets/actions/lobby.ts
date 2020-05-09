import { Lobby } from '@shared/types';

export enum LobbySocketActions {
  CONNECTED = 'CONNECTED',
  LOBBY_UPDATED = 'LOBBY_UPDATED',
  ADD_USER = 'ADD_USER',
  REMOVE_USER = 'REMOVE_USER',
}

export namespace LobbyActionParams {
  export type CONNECTED = {
    lobbyID: string,
    userID: string,
  };

  export type LOBBY_UPDATED = {
    lobby: Lobby,
  };

  export type ADD_USER = {
    lobbyID: string,
    userID: string,
    password?: string,
  };

  export type REMOVE_USER = {
    lobbyID: string,
    userID: string,
  };
}