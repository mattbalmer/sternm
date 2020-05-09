import * as React from 'react';

export class Dump extends React.Component<{ value: any }, any> {
  render() {
    return (
      <pre className='o-json-dump'>
        {JSON.stringify(this.props.value || null, null, 2)}
      </pre>
    )
  }
}