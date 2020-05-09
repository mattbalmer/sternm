import { createActionKeys, createActionStages } from '@client/utils/redux';
import { Lobby, UserID } from '@shared/types';
import LobbyClient from '@client/clients/LobbyClient';
import { LobbySocketClient } from '@client/sockets/lobby';

export const PREFIX = `@Lobby`;
export const LobbyActionTypes = createActionKeys(PREFIX, {
  FETCH_ALL: createActionStages('FETCH_ALL'),
  FETCH_ONE: createActionStages('FETCH_ONE'),
  CREATE: createActionStages('CREATE'),
  DELETE: createActionStages('DELETE'),
  ADD_USER: createActionStages('ADD_USER'),
  REMOVE_USER: createActionStages('REMOVE_USER'),
  CONNECT: createActionStages('CONNECT'),
  LOBBY_UPDATED: 'LOBBY_UPDATED',
});

export const LobbyActions = {
  fetchAllLobbies: () => (dispatch) => {
    dispatch({
      type: LobbyActionTypes.FETCH_ALL.REQUEST,
    });
    LobbyClient.fetchAll()
      .then(lobbies => {
        dispatch({
          type: LobbyActionTypes.FETCH_ALL.SUCCESS,
          lobbies,
          receivedAt: Date.now(),
        });
      });
  },

  fetchLobby: (id: string) => (dispatch) => {
    dispatch({
      type: LobbyActionTypes.FETCH_ONE.REQUEST,
      id,
    });
    return LobbyClient.fetchOne(id)
      .then(lobby => {
        dispatch({
          type: LobbyActionTypes.FETCH_ONE.SUCCESS,
          lobby,
          receivedAt: Date.now(),
        });
        return lobby;
      });
  },

  createLobby: ({ title }: { title: string }) => (dispatch) => {
    dispatch({
      type: LobbyActionTypes.CREATE.REQUEST,
      args: { title },
    });
    LobbyClient.create({ title })
      .then(lobby => {
        dispatch({
          type: LobbyActionTypes.CREATE.SUCCESS,
          lobby,
          receivedAt: Date.now(),
        });
      });
  },

  deleteLobby: (lobby: Lobby) => (dispatch) => {
    dispatch({
      type: LobbyActionTypes.DELETE.REQUEST,
      lobby,
    });
    return LobbyClient.delete(lobby._id)
      .then(() => {
        dispatch({
          type: LobbyActionTypes.DELETE.SUCCESS,
          lobby,
          receivedAt: Date.now(),
        });
        return lobby;
      });
  },

  addUserToLobby: (lobby: Lobby, user: UserID) => (dispatch) => {
    dispatch({
      type: LobbyActionTypes.ADD_USER.REQUEST,
      lobby,
      user,
    });
    LobbySocketClient.actions.addUserToLobby(lobby._id, user);
  },

  removeUserFromLobby: (lobby: Lobby, user: UserID) => (dispatch) => {
    dispatch({
      type: LobbyActionTypes.REMOVE_USER.REQUEST,
      lobby,
      user,
    });
    LobbySocketClient.actions.removeUserFromLobby(lobby._id, user);
  },

  connect: (id: string) => (dispatch) => {
    dispatch({
      type: LobbyActionTypes.CONNECT.REQUEST,
      id,
    });
    LobbySocketClient.connect(id, dispatch);
  },

  connected: ({ lobbyID, userID }) => dispatch => {
    dispatch({
      type: LobbyActionTypes.CONNECT.SUCCESS,
      lobbyID,
      userID,
    });
  },

  lobbyUpdated: (lobby: Lobby) => dispatch => {
    dispatch({
      type: LobbyActionTypes.LOBBY_UPDATED,
      lobby,
    });
  },
};