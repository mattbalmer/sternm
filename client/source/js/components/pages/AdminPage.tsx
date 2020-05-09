import * as React from 'react';
import { containerize } from '@client/utils/react';

export const AdminPage = containerize(class AdminPage extends React.Component<any, any> {
  render() {
    return (
      <div className='l-standard-page'>
        Super secret admin page!
      </div>
    );
  }
});