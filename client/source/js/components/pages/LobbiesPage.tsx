import * as React from 'react';
import { containerize, map } from '@client/utils/react';
import { LobbyActions } from '@client/actions/LobbyActions';
import CreateLobbyDialogButton from '@client/components/display/CreateLobbyDialogButton';
import { Lobby } from '@shared/types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';

const reference = (source: object, key: string, path: string) => {
  const pathparts = path.split('.').filter(_ => _);
  if (source[key]) {
    return pathparts.length > 0
     ? reference(source[key], pathparts[0], pathparts.slice(1).join('.'))
     : source[key];
  }
};

export const LobbiesPage = containerize(class LobbiesPage extends React.Component<any, any> {
  render() {
    const {
      onCreateLobby,
      onLobbySelect,
      lobbies,
      users,
    } = this.props;

    return (
      <div className='l-lobbies-page'>
        <div>
          <CreateLobbyDialogButton
            onSubmit={onCreateLobby}
          />
        </div>
        <div>
          <List>
            <ListSubheader component='div' id='lobbies-list-subheader'>
              Lobbies
            </ListSubheader>
            {map(lobbies, (lobby: Lobby) =>
              <ListItem key={lobby._id} button onClick={() => onLobbySelect(lobby)}>
                <ListItemText
                  primary={lobby.title || lobby._id}
                  secondary={`Created by ${reference(users, lobby.owner, 'name')} on ${new Date(lobby.dates.created).toLocaleString()}`}
                />
              </ListItem>
            )}
          </List>
        </div>
      </div>
    );
  }

  componentDidMount() {
    this.props.componentDidMount();
  }
},
  (state) => ({
    lobbies: state.lobbies.lobbies || {},
    users: state.users.users || {},
  }),
  (dispatch) => ({
    componentDidMount() {
      dispatch(LobbyActions.fetchAllLobbies());
    },
    onCreateLobby(title: string) {
      dispatch(LobbyActions.createLobby({ title }));
    },
    onLobbySelect(lobby: Lobby) {
      location.href = `/lobbies/${lobby._id}`;
    },
}));