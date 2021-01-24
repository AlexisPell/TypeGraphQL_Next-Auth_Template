import { NextPageContext } from 'next';
import React from 'react';

class Confirm extends React.PureComponent {
  static getInitialProps({ query: { token } }: NextPageContext) {
    console.log(token);
    return { token };
  }

  render() {
    console.log(this.props);
    return <div>HIIIIII</div>;
  }
}

export default Confirm;
