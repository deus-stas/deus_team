import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import AdminPage from '../../Admin';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
    auth.isAuthenticated === true ? (
    <AdminPage />
    ) : (<Navigate to="/login" replace />)
    
  
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
