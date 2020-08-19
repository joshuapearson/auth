import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startLoading } from '../redux/actions';

const Auth = (props) => {
  return (
    <div>
      <span onClick={() => props.startLoading()}>Welcome</span>
      <div>
        <Link to="/authenticate">Log In</Link>
      </div>
      <div>
        <Link to="/deauthenticate">Log Out</Link>
      </div>
      <div>
        <Link to="/accountCreate">Create an Account</Link>
      </div>
      <div>
        <Link to="/account">Account Details</Link>
      </div>
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({ ...auth });
export default connect(mapStateToProps, { startLoading })(Auth);
