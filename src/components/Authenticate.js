import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { authenticate, startLoading, stopLoading } from '../redux/actions';

const Authenticate = (props) => {
  const {
    isAuthenticated,
    isAuthenticating,
    doAuthenticate,
    authError
  } = props;
  console.log(props);

  if (isAuthenticated) {
    return <Redirect to="/" />;
  } else {
    let errorMessage = null;
    if (authError) {
      errorMessage = <div>{authError.message}</div>;
    }
    return (
      <div>
        <Formik
          initialValues={{ uname: '', pass: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.uname) {
              errors.uname = 'Username Required';
            }
            if (!values.pass) {
              errors.pass = 'Password Required';
            }

            return errors;
          }}
          onSubmit={(values) => {
            const { uname, pass } = values;
            const creds = { uname, pass };
            doAuthenticate(creds);
          }}
        >
          <Form>
            <div>
              <Field type="text" name="uname" placeholder="username" />
              <ErrorMessage name="uname" component="div" />
            </div>
            <div>
              <Field type="password" name="pass" placeholder="password" />
              <ErrorMessage name="pass" component="div" />
            </div>
            <div>
              <button type="submit" disabled={isAuthenticating}>
                Submit
              </button>
            </div>
            {errorMessage}
          </Form>
        </Formik>
      </div>
    );
  }
};

const mapStateToProps = ({ auth }) => ({ ...auth });

const mapDispatchToProps = (dispatch) => {
  return {
    doAuthenticate: (creds) => dispatch(authenticate(creds)),
    showLoading: () => dispatch(startLoading()),
    hideLoading: () => dispatch(stopLoading())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Authenticate);
