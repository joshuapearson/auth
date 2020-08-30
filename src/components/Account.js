import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchAccount, startLoading, stopLoading } from '../redux/actions';

class Account extends React.Component {
  componentDidMount() {
    this.props.fetchAcc();
  }

  componentWillUnmount() {
    this.props.hideLoading();
  }

  render() {
    const { isAuthenticated, isFetchingAcc, acc } = this.props;

    console.log(this.props);
    if (isFetchingAcc) {
      this.props.showLoading();
    } else {
      this.props.hideLoading();
    }

    if (!isAuthenticated) {
      return <Redirect to="/" />;
    } else {
      if (acc.uid === null) {
        return <div>Fetching Account</div>;
      } else {
        const { fname, lname, uname, email, created } = acc;
        return (
          <div>
            <div>
              <strong>Username:</strong>
              {uname}
            </div>
            <div>
              {fname} {lname}
            </div>
            <div>{email}</div>
            <div>{Date(created)}</div>
          </div>
        );
      }
    }
  }
}

const mapStateToProps = ({ auth }) => ({ ...auth });

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAcc: () => dispatch(fetchAccount()),
    showLoading: () => dispatch(startLoading()),
    hideLoading: () => dispatch(stopLoading())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
