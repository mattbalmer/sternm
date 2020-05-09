import * as React from 'react';
import classnames from 'classnames';
import { Link, withRouter } from 'react-router-dom';
import { extractCurrentPath } from '@client/utils/routes';

export interface NavTabProps {
  to: string;
}

export const NavTabComponent = withRouter(class NavTab extends React.Component<NavTabProps, any> {
  render() {
    const isActive = extractCurrentPath(this) === this.props.to;
    const className = classnames(`c-nav-tab`, {
      'is-active': isActive,
    });

    return (
      <li className={className}>
        <Link to={this.props.to}>
          {this.props.children}
        </Link>
      </li>
    );
  }
});