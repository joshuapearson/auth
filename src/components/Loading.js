import React from 'react';
import { connect } from 'react-redux';

const Loading = ({ isLoading }) => (
  isLoading ?
    <div className="Loading">
      <div className="LoadingMessage">
        loading...
      </div>
    </div>
    :
    null
);

const mapStateToProps = ({ ui }) => ({ isLoading: ui.isLoading });

export default connect(mapStateToProps)(Loading);
