import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Welcome = (props) => {
  const { isAuthenticated } = props;

  return (
    <div>
      <span>Welcome</span>
      {isAuthenticated ? (
        <>
          <div>
            <Link to="/account">Account Details</Link>
          </div>
          <div>
            <Link to="/organization">Organization Details</Link>
          </div>
          <div>
            <Link to="/deauthenticate">Log Out</Link>
          </div>
        </>
      ) : (
        <>
          <div>
            <Link to="/authenticate">Log In</Link>
          </div>
          <div>
            <Link to="/accountCreate">Create an Account</Link>
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = ({ auth }) => ({ ...auth });
export default connect(mapStateToProps)(Welcome);
