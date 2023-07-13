
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutuser } from "../../actions/authActions";
import { forwardRef } from 'react';
// import { useLogout } from 'react-admin';
import MenuItem from '@mui/material/MenuItem';
import ExitIcon from '@mui/icons-material/PowerSettingsNew';


const MyLogoutButton = forwardRef((props, ref) => {
    const handleClick = (e) => {
        e.preventDefault();
        props.logoutuser();
    };
    return (
        <MenuItem
            onClick={handleClick}
            ref={ref}
        >
            <ExitIcon /> Logout
        </MenuItem>
    );
});

MyLogoutButton.propTypes = {
    logoutuser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutuser }
  )(MyLogoutButton);