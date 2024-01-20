import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

function Signup() {
  const [userName, setUserName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!validateUsername(userName) || !validateEmail(registerEmail) || !validatePassword(registerPassword)) {
      console.log("Invalid input. Please check your details.");
      Swal.fire({
        icon: 'error',
        title: 'Sign Up Failed',
        text: 'Please provide a valid username and password.',
      });
      return;
    } else {
      console.log("Internal Signup successful!");
      try {
        const response = await axios.post('http://localhost:3005/admin/register', {
          userName,
          registerEmail,
          registerPassword
        });
        Swal.fire({
          icon: 'success',
          title: 'Sign Up Successful!',
          text: 'You have successfully signed up.',
        });
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

  };

  const validateUsername = (userName) => {
    return userName.length >= 3;
  };

  const validateEmail = (registerEmail) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(registerEmail);
  };

  const validatePassword = (registerPassword) => {
    return registerPassword.length >= 6;
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row main-content bg-success text-center">
          <div className="col-md-4 text-center company__info">
            <img
              src="https://w0.peakpx.com/wallpaper/386/592/HD-wallpaper-sail-away-929-boat-flat-material-pastel-rise-sea-sun-sunset.jpg"
              alt="company"
            />
          </div>
          <div className="col-md-8 col-xs-12 col-sm-12 login_form ">
            <div className="container-fluid">
              <div className="row">
                <h2>Sign Up</h2>
              </div>
              <div className="row">
                <form className="form-group">
                  <div className="row">
                    <input type="text"
                      onChange={(e) => setUserName(e.target.value)}
                      value={userName}
                      id="username"
                      className="form__input"
                      placeholder="Username"
                    />
                  </div>
                  <div className="row">
                    <input type="email"
                      onChange={(e) => setRegisterEmail(e.target.value)}
                      value={registerEmail}
                      id="email"
                      className="form__input"
                      placeholder="Email"
                    />
                  </div>
                  <div className="row">
                    <input type="password"
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      value={registerPassword}
                      id="password"
                      className="form__input"
                      placeholder="Password"
                    />
                  </div>
                  <div className="row justify-content-center">
                    <input
                      type="submit"
                      value="Sign Up"
                      className="btn btn-primary"
                      onClick={handleSignup}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
