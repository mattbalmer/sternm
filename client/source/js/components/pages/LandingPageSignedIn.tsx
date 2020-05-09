import * as React from 'react';
import { containerize } from '@client/utils/react';

export const LandingPageSignedIn = containerize(class LandingPageSignedIn extends React.Component<any, any> {
  render() {
    return (
      <div className='l-standard-page'>
        Welcome to our app
      </div>
    );
  }
});