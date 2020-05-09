import { LobbyActionParams, LobbySocketActions } from '@shared/sockets/actions/lobby';
import { joinLobby, leaveLobby } from '@server/actions/lobbies';
import { areMatchingIDs } from 'utils/mongo';
import { SocketClient, User, UserID, UserRole } from 'types';

function getPassportUser(socket): User {
  return socket && socket.request && socket.request.user;
}

function isAdmin(user: User): boolean {
  return user.roles.includes(UserRole.ADMIN);
}

function isSelfOrAdmin(user: User, userID: UserID): boolean {
  return areMatchingIDs(user._id, userID) || isAdmin(user);
}


export default function({ io }: any) {
  const lobbiesIO = io.of('/lobbies');

  lobbiesIO.on('connection', (client: SocketClient) => {
    const user: User = getPassportUser(client);
    const lobbyID = client.handshake['query']['lobbyID'];
    console.log('User joined lobby socket', lobbyID, user);

    client.join(lobbyID);

    client.emit(LobbySocketActions.CONNECTED, {
      lobbyID,
      userID: user._id,
    });

    client.on(LobbySocketActions.ADD_USER, async ({ userID }: LobbyActionParams.ADD_USER) => {
      if (!isSelfOrAdmin(user, userID)) {
        console.log('Cannot add user to room - unauthorized user');
      }

      console.log('user join request', userID, lobbyID);

      try {
        const lobby = await joinLobby({
          lobbyID,
          userID,
        });
        lobbiesIO.in(lobbyID).emit(LobbySocketActions.LOBBY_UPDATED, { lobby });
      } catch (err) {
        console.log('Error adding user to lobby', err);
      }
    });

    client.on(LobbySocketActions.REMOVE_USER, async (data) => {
      const { userID } = data;
      if (!isSelfOrAdmin(user, userID)) {
        console.log('Cannot remove user to room - unauthorized user');
      }
      try {
        const lobby = await leaveLobby({
          lobbyID,
          userID,
        });
        lobbiesIO.in(lobbyID).emit(LobbySocketActions.LOBBY_UPDATED, { lobby });
      } catch (err) {
        console.log('Error removing user from lobby', err);
      }
    });

    client.on('disconnect', () => {
      console.log(`User left lobby socket`, lobbyID, user);
    });
  });
};