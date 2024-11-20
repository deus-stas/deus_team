import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../../actions/authActions";
import classnames from "classnames";



const Register = (props) => {
  
  const navigate = useNavigate();
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    type:"",
    errors: {}
  });
  

  useEffect(() => {
    // If logged in and user navigates to Login page, redirect them to the dashboard
    if (props.errors) {
      console.log(props.errors)
    } else {
      navigate("/login");
    }
  }, [props.errors, navigate]);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      errors: props.errors
    }));
  }, [props.errors]);

  const { errors } = state;

  const onChangeInput = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const onRegister = (e) => {
    e.preventDefault();

    const newUser = {
      name: state.name,
      email: state.email,
      password: state.password,
      password2: state.password2,
      type: state.type
    };

    // console.log(newUser);

    props.registerUser(newUser, navigate);
  };

  return (
    <main className="login">
      <div className="container authContainer" style={{ marginTop: "4rem" }} >
        <div>
          <div>
            <div style={{ paddingLeft: "11.250px" }}>
              <h4 className="heading-secondary">
                <b>Register</b> below
              </h4>
              <p className="form__title">
                Already have an account? <Link className="underline" to="/login">Log in</Link>
              </p>
            </div>
            <form className="form" noValidate onSubmit={onRegister}>
              <div className="form__wrap">
                  <div className="form__group">
                    <input
                      onChange={onChangeInput}
                      value={state.name}
                      error={errors.name}
                      id="name"
                      type="text"
                      placeholder='Имя'
                      className={`form__input ${classnames("", {
                        invalid: errors.name
                      })}`}/>
                    <span className="form__error">
                      {errors.name}
                    </span>
                </div>
              </div>
              <div className="form__wrap">
                <div className="form__group">
                    <input
                      onChange={onChangeInput}
                      value={state.email}
                      error={errors.email}
                      id="email"
                      type="email"
                      placeholder='E-mail'
                      className={`form__input ${classnames("", {
                        invalid: errors.email
                      })}`}/>
                      <span className="form__error">
                        {errors.email}
                      </span>
                </div>
              </div>
              <div className="form__wrap">
                <div className="form__group">
                  <input
                    onChange={onChangeInput}
                    value={state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                    placeholder='Пароль'
                    className={`form__input ${classnames("", {
                      invalid: errors.password
                    })}`}/>
                    <span className="form__error">
                        {errors.password}
                      </span>
                </div>                
              </div>
              <div className="form__wrap">
                <div className="form__group">
                  <input
                    onChange={onChangeInput}
                    value={state.password2}
                    error={errors.password2}
                    id="password2"
                    type="password"
                    placeholder='Подтверждение пароля'
                    className={`form__input ${classnames("", {
                      invalid: errors.password2
                    })}`}/>
                    <span className="form__error">
                        {errors.password2}
                      </span>
                </div>                
              </div>
              <button 
                type="submit" 
                className='btn --orange'>
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});



export default connect(mapStateToProps, { registerUser })(Register);