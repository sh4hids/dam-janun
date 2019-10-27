import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function withAuth(WrappedComponent) {
  class WithAuthentication extends Component {
    render() {
      const { isAuthenticated } = this.props;

      return (
        <Fragment>
          {isAuthenticated ? (
            <WrappedComponent {...this.props} />
          ) : (
            <Redirect to="/login" />
          )}
        </Fragment>
      );
    }
  }

  const { bool } = PropTypes;
  WithAuthentication.propTypes = {
    isAuthenticated: bool.isRequired,
  };

  const mapStateToProps = ({ auth }) => ({
    isAuthenticated: auth.isAuthenticated,
  });

  return connect(mapStateToProps)(WithAuthentication);
}
