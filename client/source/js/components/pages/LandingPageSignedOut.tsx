import * as React from 'react';
import { containerize } from '@client/utils/react';

export const LandingPageSignedOut = containerize(class LandingPage extends React.Component<any, any> {
  render() {
    return (
      <div className='l-standard-page'>
        Sign in to view the app!
      </div>
    );
  }
});