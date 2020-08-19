import React from 'react';
import { connect } from 'react-redux';

const Deauthenticate = (props) => {
  return <div>Deauthenticate</div>;
};

const mapStateToProps = ({ auth }) => ({ ...auth });
export default connect(mapStateToProps)(Deauthenticate);
