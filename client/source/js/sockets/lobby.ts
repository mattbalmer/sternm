import * as io from 'socket.io-client'
import { createQueryString } from '@client/utils/url';
import { LobbyActions } from '@client/actions/LobbyActions';
import { LobbyActionParams, LobbySocketActions } from '@shared/sockets/actions/lobby';

class LobbySocketClient {
  connection = null;
  dispatch = (action) => {};

  connect(lobbyID: string, dispatch) {
    this.dispatch = dispatch;
    this.connection = io('/lobbies', {
      query: createQueryString({
        lobbyID,
      }),
    });

    this.connection.on(LobbySocketActions.CONNECTED, this.events.connected);
    this.connection.on(LobbySocketActions.LOBBY_UPDATED, this.events.lobbyUpdated);
  }

  disconnect(lobbyID: string, dispatch) {
    this.dispatch = (action) => {};
    this.connection.disconnect();
    this.connection = null;
  }

  events = {
    connected: ({ userID, lobbyID }) => {
      this.dispatch(LobbyActions.connected({ userID, lobbyID }));
    },
    lobbyUpdated: ({ lobby } : LobbyActionParams.LOBBY_UPDATED) => {
      const action = LobbyActions.lobbyUpdated(lobby);
      this.dispatch(action);
    },
  };

  actions = {
    addUserToLobby: (lobbyID: string, userID: string) => {
      console.log('addUserToLobby', lobbyID, userID);
      this.connection.emit(LobbySocketActions.ADD_USER, { lobbyID, userID });
    },
    removeUserFromLobby: (lobbyID: string, userID: string) => {
      console.log('removeUserFromLobby', lobbyID, userID);
      this.connection.emit(LobbySocketActions.REMOVE_USER, { lobbyID, userID });
    },
  };
}

const client = new LobbySocketClient();
export {
  client as LobbySocketClient
}