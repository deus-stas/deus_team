import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../../actions/authActions";
import classnames from "classnames";







const Login = (props) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    email: "",
    password: "",
    errors: {}
  });
  
  

  const { errors } = state;

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      navigate("/admin/projects");
    }
  }, [props.auth.isAuthenticated, navigate]);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      errors: props.errors
    }));
  }, [props.errors]);

  const onChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: state.email,
      password: state.password
    };

    props.loginUser(userData, navigate);
  };

  return (
    <main className="login">
        <div className="container authContainer" style={{ marginTop: "16rem", marginBottom: "16rem" }} >
          <div >
            <div>
              <h4 className="heading-secondary">
                <b>Login</b> below
              </h4>
            </div>
            <form className="form" style={{marginTop:"40px"}} noValidate onSubmit={onSubmit}>
              <div className="form__wrap">
                  <div className="form__group">
                      <input 
                        onChange={onChange}
                        value={state.email}
                        error={errors.email}
                        id="email"
                        type="email" 
                        placeholder="E-mail"
                        className={`form__input ${classnames("", {
                          invalid: errors.email || errors.emailnotfound
                        })}`}/>
                        <span className="form__error">
                          {errors.email}
                          {errors.emailnotfound}
                        </span>
                  </div>
                  
              </div>
              <div className="form__wrap">
                  <div className="form__group">
                      <input 
                         onChange={onChange}
                         value={state.password}
                         error={errors.password}
                         id="password"
                         type="password"
                         placeholder="Пароль"
                        className={`form__input ${classnames("", {
                          invalid: errors.password || errors.passwordincorrect
                        })}`}
                        />
                        <span className="form__error">
                          {errors.password}
                          {errors.passwordincorrect}
                        </span>
                  </div>
              </div>
              <button 
                type="submit" 
                className='btn --orange'>
                Login
              </button>
            </form>
          </div>
        </div>
    </main>
  );
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);