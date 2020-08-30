import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { deauthenticate, startLoading, stopLoading } from '../redux/actions';

class Deauthenticate extends React.Component {
  componentDidMount() {
    this.props.deauth();
  }

  componentWillUnmount() {
    this.props.hideLoading();
  }

  render() {
    const { isAuthenticated, isDeauthenticating } = this.props;

    if (isDeauthenticating) {
      this.props.showLoading();
    } else {
      this.props.hideLoading();
    }

    if (!isAuthenticated) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <div>Logging Out</div>
        </div>
      );
    }
  }
}
const mapStateToProps = ({ auth }) => ({ ...auth });

const mapDispatchToProps = (dispatch) => {
  return {
    deauth: () => dispatch(deauthenticate()),
    showLoading: () => dispatch(startLoading()),
    hideLoading: () => dispatch(stopLoading())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Deauthenticate);
