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
          initialValues={{ uname: '', pass: '', totp: '' }}
          validate={(values) => {
            const errors = {};
            if (!values.uname) {
              errors.uname = 'Username Required';
            }
            if (!values.pass) {
              errors.pass = 'Password Required';
            }
            if (!values.totp) {
              errors.totp = 'Security Code Required';
            } else if (!values.totp.match(/\d{6}/)) {
              errors.totp = 'Security Code Must Be 6 Digits';
            }

            return errors;
          }}
          onSubmit={(values) => {
            const { uname, pass, totp } = values;
            const creds = { uname, pass, totp };
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
              <Field type="text" name="totp" placeholder="security code" />
              <ErrorMessage name="totp" component="div" />
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
