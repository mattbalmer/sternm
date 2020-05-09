import * as React from 'react';
import { containerize } from '@client/utils/react';
import { LobbyActions } from '@client/actions/LobbyActions';
import { Lobby, User, UserID } from '@shared/types';
import { UserActions } from '@client/actions/UserActions';
import { LobbyComponent } from '@client/components/display/LobbyComponent';
import CircularProgress from '@material-ui/core/CircularProgress';

type LobbyPageProps = {
  [prop: string]: any,
  lobbies: Record<string, Lobby>,
  users: Record<UserID, User>,
  currentUser: User,
}

export const LobbyPage = containerize(class LobbyPage extends React.Component<LobbyPageProps, any> {
  state = {
    usersBeingRequested: [],
  };

  render() {
    const {
      lobbies,
      users,
      lobbyID,
      currentUserId,
    } = this.props;

    const lobby = lobbies[lobbyID];
    const currentUser = users[currentUserId];

    return (
      <div className='l-lobby-page'>
        {(lobby && currentUser)
          ? <LobbyComponent
                lobby={lobby}
                currentUser={currentUser}
                onStartGame={this.props.onStartGame}
                onDeleteLobby={this.props.onDeleteLobby}
                onJoinLobby={this.props.onJoinLobby}
                onLeaveLobby={this.props.onLeaveLobby}
                getUser={user => users[user]}
              />
          : <CircularProgress />
        }
      </div>
    );
  }

  componentDidUpdate() {
    // todo: this is really ugly, but it works
    const lobby = this.props.lobbies[this.props.lobbyID];
    if (lobby) {
      const missingUsers = lobby.users
        .filter(userID => !Boolean(this.props.users[userID]) && !this.state.usersBeingRequested.includes(userID));
      console.log('fetch new users? ', missingUsers, lobby.users);
      if (missingUsers.length > 0) {
        this.setState({
          usersBeingRequested: [...this.state.usersBeingRequested, ...missingUsers]
        });
        this.props.getMissingUsers(missingUsers);
      }
    }
  }

  componentDidMount() {
    this.props.componentDidMount(this.props.lobbies[this.props.lobbyID]);
  }
},
  (state, ownProps) => {
    return {
      lobbies: (state.lobbies.lobbies || {}),
      lobbyID: [ownProps.match.params.lobbyId],
      users: state.users.users || {},
      currentUserId: state.users.myId,
    }
  },
  (dispatch, ownProps) => ({
    componentDidMount(lobby: Lobby) {
      const lobbyID = lobby ? lobby._id : ownProps.match.params.lobbyId;
      dispatch(LobbyActions.connect(lobbyID));
      dispatch(LobbyActions.fetchLobby(lobbyID));
    },
    onDeleteLobby(lobby: Lobby) {
      dispatch(LobbyActions.deleteLobby(lobby)).then((lobby) => {
        if (lobby) {
          window.location.href = '/lobbies';
        }
      });
    },
    onJoinLobby(lobby: Lobby, user: User) {
      dispatch(LobbyActions.addUserToLobby(lobby, user._id));
    },
    onLeaveLobby(lobby: Lobby, user: User) {
      dispatch(LobbyActions.removeUserFromLobby(lobby, user._id));
    },
    getMissingUsers(userIDs: string[]) {
      dispatch(UserActions.fetchSome(userIDs))
    },
  })
);