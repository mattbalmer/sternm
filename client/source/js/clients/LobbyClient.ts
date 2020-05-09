import Config from '@client/config';
import { BaseResourceClient } from '@client/clients/_BaseResourceClient';
import { create, destroy } from '@client/utils/service';
import { UserID } from '@shared/types';

const BASE_PATH = `${Config.API_HOST}/api/lobbies`;

class LobbyClient extends BaseResourceClient {
  startGame(lobbyId: string) {
    return create(`${this.basePath}/${lobbyId}/game`, {}, {
      errorMessage: `Error starting game for ${this.resourceName}entry`,
    });
  }

  addUser(lobbyId: string, user: UserID) {
    return create(`${this.basePath}/${lobbyId}/users`, { _id: user }, {
      errorMessage: `Error adding user to ${this.resourceName}entry`,
    });
  }

  removeUser(lobbyId: string, user: UserID) {
    return destroy(`${this.basePath}/${lobbyId}/users`, user,{
      errorMessage: `Error removing user from ${this.resourceName}entry`,
      shouldAcceptStatus: _ => _ === 200, //todo: yes I know
    });
  }
}

export default new LobbyClient(BASE_PATH, 'lobby');
