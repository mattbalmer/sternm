import * as React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { User, UserRole } from '@client/types';
import { containerize } from '@client/utils/react';
import { NavTabComponent } from '@client/components/display/NavTabComponent';

export const HeaderContainer = containerize(class HeaderContainer extends React.Component<any, any> {
  state = {
    anchorEl: null,
  };

  render() {
    const { anchorEl } = this.state;
    const { users } = this.props;
    const { myId } = users;
    const clientUser: User = myId ? users.users[myId] : null;
    const isAdmin = clientUser?.roles.includes(UserRole.ADMIN);

    return (
      <header className='c-header'>
        <ul className='c-header__nav-tabs'>
          <NavTabComponent to='/'>Main</NavTabComponent>
          {isAdmin ? <NavTabComponent to='/admin'>Admin</NavTabComponent> : null}
        </ul>
        <React.Fragment>
          {clientUser
            ? (<div className='c-header__avatar' onClick={this.handleMenuOpen}>
                {clientUser.profile?.avatar ? <img className='o-avatar' src={clientUser.profile.avatar} /> : <span>{clientUser.profile?.name}</span>}
              </div>
              )
            : <Button color='primary' href='/auth/google'>Sign in with Google</Button>
          }
          {clientUser ? <Menu
            id='login-menu'
            anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={this.handleMenuClose}
          >
            <MenuItem onClick={this.handleManageAccount}>Manage Account</MenuItem>
            <MenuItem onClick={this.handleSignout}>Sign Out</MenuItem>
          </Menu> : null}
        </React.Fragment>
      </header>
    );
  }

  handleMenuOpen = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };

  handleSignout = () => {
    this.handleMenuClose();
    window.location.href = '/auth/logout';
  };

  handleManageAccount = () => {
    this.handleMenuClose();
    window.location.href = '/account';
  };
}, (state: any) => {
  return {
    users: state.users || {},
  }
});