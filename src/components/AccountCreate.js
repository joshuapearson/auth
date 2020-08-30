import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import QRImage from 'react-qr-image';

class AccountCreate extends React.Component {
  render() {
    console.log(this.props);
    const { isAuthenticated } = this.props;

    if (isAuthenticated) {
      return <Redirect to="/" />;
    } else {
      return (
        <div>
          <div>Account Create</div>
          <QRImage text="otpauth://totp/Patina%20Auth%3A%20testUser?secret=6HSX3ZXHWLHFXQSUV2H5OFHLMDF636Y7KXANSHBBWP2Y2H5S743A7SYUIZX4IXS2PZKWE7SKSTFIMLAEUQX4RKVJAXLTC4WUSYQJR2Y&issuer=auth.patina.workers.dev" />
        </div>
      );
    }
  }
}

const mapStateToProps = ({ auth }) => ({ ...auth });
export default connect(mapStateToProps)(AccountCreate);
