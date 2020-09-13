import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchOrganization, startLoading, stopLoading } from '../redux/actions';

class Organization extends React.Component {
  componentDidMount() {
    this.props.fetchOrg();
  }

  componentWillUnmount() {
    this.props.hideLoading();
  }

  render() {
    const { isAuthenticated, isFetchingAcc, org = {} } = this.props;
    const { orgName, orgMembers } = org;
    if (isFetchingAcc) {
      this.props.showLoading();
    } else {
      this.props.hideLoading();
    }

    if (!isAuthenticated) {
      return <Redirect to="/" />;
    } else {
      if (!orgName) {
        return <div>Fetching Organization</div>;
      } else {
        return (
          <div>
            <div>
              <strong>Organization:</strong>
              {orgName}
            </div>
            <div>{orgMembers.length} members</div>
          </div>
        );
      }
    }
  }
}

const mapStateToProps = ({ auth }) => ({ ...auth });

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrg: () => dispatch(fetchOrganization()),
    showLoading: () => dispatch(startLoading()),
    hideLoading: () => dispatch(stopLoading())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Organization);
