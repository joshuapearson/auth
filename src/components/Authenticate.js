import React from 'react';
import { connect } from 'react-redux';

const Authenticate = props => {
  return (
    <div>
      Authenticate
    </div>
  );
}

const mapStateToProps = ({ auth }) => ({ ...auth });
export default connect(
  mapStateToProps
)(Authenticate);
