import React from 'react';
import { connect } from 'react-redux';

const Account = (props) => {
  return <div>Account</div>;
};

const mapStateToProps = ({ auth }) => ({ ...auth });
export default connect(mapStateToProps)(Account);
