import Config from '@client/config';
import LoggerService from '@client/services/LoggerService';
import { fetchAll } from '@client/utils/service';
import { User, UserRole } from '@client/types';

const BASE_PATH = `${Config.API_HOST}/api/users`;

class UserClient {
  constructor() {}

  fetchAll(query?, fields?) {
    return fetchAll(BASE_PATH,{
      query,
      fields,
      errorMessage: `Error fetching user list`
    });
  }

  fetchMe() {
    return fetch(`${BASE_PATH}/me/`, { credentials: 'include' })
      .then((response) => response.status === 200 ? response.json() : null)
      .catch((err) => {
        LoggerService.error(`Error fetching self user data`, err);
      });
  }

  isAdmin(user: User) {
    return user && user.roles && user.roles.indexOf(UserRole.ADMIN) > -1;
  }
}

export default new UserClient();
