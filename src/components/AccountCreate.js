import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import QRImage from 'react-qr-image';
import { createAccount, startLoading, stopLoading } from '../redux/actions';

const ACCOUNT_CREATE_PHASE = {
  ORG: 'org',
  DEMOGRAPHIC: 'demographic',
  ACCOUNT: 'account',
  CREDENTIALS: 'credentials',
  CONFIRM: 'confirm'
};

const initialValues = {
  orgId: '',
  fname: '',
  lname: '',
  uname: '',
  email: '',
  pass: '',
  verifyPass: '',
  totp: ''
};

class AccountCreate extends React.Component {
  constructor(props) {
    super(props);
    this.submitAccountCreate = this.submitAccountCreate.bind(this);
    this.validateAccountCreate = this.validateAccountCreate.bind(this);
  }

  validateAccountCreate(values) {
    const { regSession = {} } = this.props;
    const { phase = 'org' } = regSession;
    const errors = {};
    switch (phase) {
      case ACCOUNT_CREATE_PHASE.ORG:
        if (!values.orgId) {
          errors.orgId = 'organization code required';
        }
        break;
      case ACCOUNT_CREATE_PHASE.DEMOGRAPHIC:
        if (!values.fname) {
          errors.fname = 'first name required';
        }
        if (!values.lname) {
          errors.lname = 'last name required';
        }
        if (
          !values.email ||
          !values.email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
        ) {
          errors.email = 'valid email address required';
        }
        break;
      case ACCOUNT_CREATE_PHASE.ACCOUNT:
        if (!values.uname) {
          errors.uname = 'unique username required';
        }
        break;
      case ACCOUNT_CREATE_PHASE.CREDENTIALS:
        if (!values.pass) {
          errors.pass = 'password required';
        }
        if (values.pass && values.pass !== values.verifyPass) {
          errors.pass = 'password entries do not match';
        }
        if (!values.totp || !values.totp.match(/\d{6}/)) {
          errors.totp = 'secret code must be a six digit value';
        }
        break;
      case ACCOUNT_CREATE_PHASE.CONFIRM:
        break;
      default:
        console.error(`unrecognized ACCOUNT_CREATE_PHASE: ${phase}`);
    }
    return errors;
  }

  submitAccountCreate(values) {
    const { doCreateAccount, regSession = {} } = this.props;
    const { phase = 'org' } = regSession;

    let acc = {
      orgId: values.orgId,
      fname: values.fname,
      lname: values.lname,
      email: values.email,
      uname: values.uname,
      pass: values.pass,
      totp: values.totp
    };
    if (phase === ACCOUNT_CREATE_PHASE.CONFIRM) {
      acc.confirm = true;
    }

    doCreateAccount(acc);
  }

  render() {
    console.log(this.props);
    const { isAuthenticated, regSession, regErrors = {} } = this.props;
    const { org, phase = ACCOUNT_CREATE_PHASE.ORG, totpUri = '' } = regSession;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <Formik
            initialValues={initialValues}
            validate={this.validateAccountCreate}
            onSubmit={this.submitAccountCreate}
          >
            <Form>
              {phase === ACCOUNT_CREATE_PHASE.ORG ? (
                <div>
                  <Field
                    type="text"
                    name="orgId"
                    placeholder="organization code"
                  />
                  <ErrorMessage name="orgId" component="div" />
                  {regErrors.orgId ? (
                    <div>invalid organization code</div>
                  ) : null}
                  <div>
                    <button type="submit">get started</button>
                  </div>
                </div>
              ) : (
                <div>Organization: {org.name}</div>
              )}

              {phase === ACCOUNT_CREATE_PHASE.DEMOGRAPHIC ? (
                <>
                  <div>
                    <Field type="text" name="fname" placeholder="first name" />
                  </div>
                  <div>
                    <Field type="text" name="lname" placeholder="last name" />
                  </div>
                  {regErrors.name ? (
                    <div>please enter first and last name</div>
                  ) : null}
                  <div>
                    <Field type="text" name="email" placeholder="email" />
                  </div>
                  <div>
                    <button type="submit">continue</button>
                  </div>
                </>
              ) : null}

              {phase === ACCOUNT_CREATE_PHASE.ACCOUNT ? (
                <>
                  <div>
                    <Field type="text" name="uname" placeholder="username" />
                  </div>
                  {regErrors.uname ? <div>username not available</div> : null}
                  <div>
                    <button type="submit">continue</button>
                  </div>
                </>
              ) : null}

              {phase === ACCOUNT_CREATE_PHASE.CREDENTIALS ? (
                <>
                  <div>
                    <Field type="password" name="pass" placeholder="password" />
                    <Field
                      type="password"
                      name="verifyPass"
                      placeholder="re-type password"
                    />
                  </div>
                  {regErrors.pass ? <div>invalid password</div> : null}
                  <div>
                    <Field
                      type="text"
                      name="totp"
                      placeholder="security code"
                      maxlength="6"
                      minlength="6"
                    />
                    {regErrors.totp ? (
                      <div>security code does not match</div>
                    ) : null}
                    {totpUri ? (
                      <div>
                        <QRImage text={totpUri} />
                      </div>
                    ) : null}
                    <div>
                      <button type="submit">verify</button>
                    </div>
                  </div>
                </>
              ) : null}
              {phase === ACCOUNT_CREATE_PHASE.CONFIRM ? (
                <>
                  <div>
                    <input type="hidden" name="confirm" value="true" />
                    <button type="submit">create account</button>
                  </div>
                </>
              ) : null}
            </Form>
          </Formik>
        </div>
      );
    }
  }
}

const mapStateToProps = ({ auth }) => ({ ...auth });

const mapDispatchToProps = (dispatch) => {
  return {
    doCreateAccount: (account) => dispatch(createAccount(account)),
    showLoading: () => dispatch(startLoading()),
    hideLoading: () => dispatch(stopLoading())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountCreate);
