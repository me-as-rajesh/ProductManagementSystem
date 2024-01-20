import React, { useState, useEffect  } from "react";
import { Routes, Route, useNavigate, Link, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from "axios";
import { authentication } from '../features/authAction'
import Swal from 'sweetalert2';

function Login() {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const rememberMePreference = localStorage.getItem('rememberMe') === 'true';
    setRememberMe(rememberMePreference);
  }, []);


  const validateForm = () => {
    const errors = {};
    if (!email.trim()) {
      errors.email = "email is required";
    }
    if (!password.trim()) {
      errors.password = "Password is required";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //validateForm()

    console.log("Internal Login successful!");
    try {
      const response = await axios.post('http://localhost:3005/admin/login', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
      const token = response.data.token;
      localStorage.setItem('jwtToken', token);

      if (rememberMe) {
        localStorage.setItem('rememberMe', 'true');
      } else {
        localStorage.removeItem('rememberMe');
      }
      dispatch(authentication());
      Swal.fire({
        icon: 'success',
        title: 'Login Successful!',
        text: 'Welcome back!',
      });
    } catch (error) {
      console.error('Login failed:', error.response.data);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid username or password. Please try again.'
      });
    }

  }

  return (
    <>
      <div className="container-fluid">
        <div className="row main-content bg-success text-center">
          <div className="col-md-4 text-center company__info">
            <img
              src="https://w0.peakpx.com/wallpaper/386/592/HD-wallpaper-sail-away-929-boat-flat-material-pastel-rise-sea-sun-sunset.jpg"
              alt="new"
            />
          </div>
          <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
            <div className="container-fluid">
              <div className="row">
                <h2>Log In</h2>
              </div>
              <div className="row">
                <form control="" className="form-group">
                  <div className="row">
                    <input type="text"
                      onChange={(e) => setemail(e.target.value)}
                      value={email}
                      id="email" className={`form__input ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="email" />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="row">
                    <input type="password" onChange={(e) => setPassword(e.target.value)}
                      value={password} id="password"
                      className={`form__input ${errors.password ? 'is-invalid' : ''}`} placeholder="Password" />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <div className="row ">
                    <label className="checkbox-inline">
                      <input type="checkbox" name="remember_me" id="remember_me"  checked={rememberMe}
                        onChange={() => setRememberMe(!rememberMe)} /> Remember Me!
                    </label>
                  </div>
                  <div className="row justify-content-center">
                    <input type="submit" value="Login" onClick={handleSubmit} className="btn" />
                  </div>
                </form>
              </div>
              <div className="row">
                <p>Don't have an account? <Link to="register">Register Here</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
