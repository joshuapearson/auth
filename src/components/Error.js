import React from 'react';
import { connect } from 'react-redux';

const Error = (props) => {
  return <div>Error</div>;
};

const mapStateToProps = ({ auth }) => ({ ...auth });
export default connect(mapStateToProps)(Error);
