import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { containerize } from '@client/utils/react';
import { AppContainer } from '@client/components/containers/AppContainer';
import { UserActions } from '@client/actions/UserActions';
import { LandingPageSignedOut } from '@client/components/pages/LandingPageSignedOut';
import { AdminPage } from '@client/components/pages/AdminPage';
import { LobbiesPage } from '@client/components/pages/LobbiesPage';
import { LobbyPage } from '@client/components/pages/LobbyPage';

const HomePageWrapperComponent = containerize(class HomePageWrapperComponent extends React.Component<any, any> {
  render() {
    return this.props.isLoggedIn
      ? <LobbiesPage />
      : <LandingPageSignedOut />
  }
}, (state) => ({
  isLoggedIn: state.users.isLoggedIn
}));

export const AppComponent = containerize(class AppComponent extends React.Component<any, any> {
  render() {
    return (
      <Router>
        <AppContainer>
          <Route exact path='/' component={HomePageWrapperComponent} />
          <Route exact path='/admin' component={AdminPage} />
          <Route exact path='/lobbies' component={LobbiesPage} />
          <Route exact path='/lobbies/:lobbyId' component={LobbyPage} />
        </AppContainer>
      </Router>
    );
  }

  componentDidMount() {
    this.props.componentDidMount();
  }
}, (state: any) => {
  return state;
}, (dispatch: any, ownProps: any) => {
  return {
    componentDidMount() {
      dispatch(UserActions.fetchSelf());
    },
  }
});