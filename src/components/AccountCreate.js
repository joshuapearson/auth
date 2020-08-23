import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class AccountCreate extends React.Component {
  render() {
    console.log(this.props);
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <div>Account Create</div>
        </div>
      );
    }
  }
}

const mapStateToProps = ({ auth }) => ({ ...auth });
export default connect(mapStateToProps)(AccountCreate);
