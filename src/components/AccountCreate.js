import React from 'react';
import { connect } from 'react-redux';

const AccountCreate = props => {
  return (
    <div>
      Account Create
    </div>
  );
}

const mapStateToProps = ({ auth }) => ({ ...auth });
export default connect(
  mapStateToProps
)(AccountCreate);
