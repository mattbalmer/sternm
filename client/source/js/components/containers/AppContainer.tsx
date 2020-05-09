import * as React from 'react';
import { Router, Route, Switch, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { push } from 'react-router-redux';
import { withRouter } from 'react-router';
import { HeaderContainer } from '@client/components/containers/HeaderContainer';
import { containerize } from '@client/utils/react';

export const AppContainer = containerize(class AppContainer extends React.Component<any, any> {
  render() {
    return (
      <React.Fragment>
        <HeaderContainer />
        <main className='u-flex u-flex--col u-flex--grow'>
          {this.props.children}
        </main>
      </React.Fragment>
    );
  }
});