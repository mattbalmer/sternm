import { LobbyModel } from 'schemas/lobby';
import { areMatchingIDs } from 'utils/mongo';

export async function leaveLobby({ lobbyID, userID }: { lobbyID: string, userID: string }) {
  const lobby = await LobbyModel.findById(lobbyID);

  lobby.users = lobby.users.filter(id => {
    return !areMatchingIDs(id, userID);
  });

  console.log('new users', lobby.users);

  return await lobby.save();
}

export async function joinLobby({ lobbyID, userID }: { lobbyID: string, userID: string }) {
  const lobby = await LobbyModel.findById(lobbyID);

  lobby.users = Array.from(new Set([
    ...lobby.users,
    userID,
  ]));

  console.log('new users', lobby.users);

  return await lobby.save();
}
