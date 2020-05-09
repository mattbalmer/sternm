import * as React from 'react';
import classnames from 'classnames';
import Typography from '@material-ui/core/Typography/Typography';
import Button from '@material-ui/core/Button/Button';
import List from '@material-ui/core/List/List';
import ListSubheader from '@material-ui/core/ListSubheader/ListSubheader';
import { Lobby, User, UserID } from '@shared/types';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import { generate } from '@shared/utils/arrays';

export interface LobbyProps {
  lobby: Lobby,
  currentUser: User;
  onStartGame: Function;
  onDeleteLobby: Function;
  onJoinLobby: Function;
  onLeaveLobby: Function;
  getUser: (userID: UserID) => User;
}

export class LobbyComponent extends React.Component<LobbyProps, any> {
  render() {
    const {
      lobby,
      currentUser,
    } = this.props;

    const className = classnames(`c-lobby`, {});

    return (
      <div className={className}>
        <Typography variant='h2' gutterBottom>
          {lobby.title}
        </Typography>
        <div className={'l-lobby-page__action-buttons-group'}>
          {lobby.owner === currentUser._id ?
            <Button
              variant='outlined'
              color='secondary'
              onClick={this.handleDeleteLobby}
            >
              Delete Lobby
            </Button>
            : null}
          {lobby.users.includes(currentUser._id) && lobby.owner !== currentUser._id ?
            <Button
              variant='outlined'
              color='secondary'
              onClick={this.handleLeaveLobby}
            >
              Leave Lobby
            </Button>
            : null}
          {!lobby.users.includes(currentUser._id) ?
            <Button
              variant='outlined'
              color='primary'
              onClick={this.handleJoinLobby}
            >
              Join Lobby
            </Button>
            : null}
        </div>
        <List>
          <ListSubheader component='div' id='lobbies-list-subheader'>
            Users ({lobby.users.length} / 4
          </ListSubheader>
          {lobby.users.map((userID: UserID) => {
            const user: User = this.props.getUser(userID);
            return <ListItem key={userID} button>
              {user
                ? <ListItemText
                  primary={user.profile.name}
                  secondary={userID === lobby.owner ? '(Owner)' : ''}
                />
                : <ListItemText
                  primary={'Unknown user'}
                  secondary={userID === lobby.owner ? '(Owner)' : ''}
                />
              }
            </ListItem>
          })}
          {generate(Math.max(4 - lobby.users.length), null).map((_, i) => {
            return <ListItem key={i} button>
              <ListItemText
                primary={'-'}
                secondary={'[EMPTY SLOT]'}
              />
            </ListItem>
          })}
        </List>
      </div>
    );
  }

  handleStartGame = () => {
    this.props.onStartGame(this.props.lobby);
  };

  handleDeleteLobby = () => {
    this.props.onDeleteLobby(this.props.lobby);
  };

  handleJoinLobby = () => {
    this.props.onJoinLobby(this.props.lobby, this.props.currentUser);
  };

  handleLeaveLobby = () => {
    this.props.onLeaveLobby(this.props.lobby, this.props.currentUser);
  };
};