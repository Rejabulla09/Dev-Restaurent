import React, { useState } from 'react';
import './LoginPopup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login"); // Login | Sign Up | ForgotPassword
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`${currState} submitted:`, formData);
  };

  const switchForm = (targetState) => {
    setCurrState(targetState);
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
    setShowPassword(false);
  };

  return (
    <div className='login-popup'>
      <div className='login-popup-container'>
        <form onSubmit={handleSubmit}>
          <div className='login-popup-title'>
            <h2>
              {currState === 'ForgotPassword' ? 'Reset Password' : currState}
            </h2>
            <button 
              type="button" 
              onClick={() => setShowLogin(false)}
              className="close-btn"
            >
              X
            </button>
          </div>
          
          <div className='login-popup-inputs'>
            {currState === "Sign Up" && (
              <input 
                type='text' 
                name='name'
                placeholder='Your name' 
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            )}
            
            {(currState !== "ForgotPassword") && (
              <>
                <input 
                  type='email' 
                  name='email'
                  placeholder='Your email' 
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />

                <div className='password-input-container'>
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    name='password'
                    placeholder='Password' 
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button 
                    type='button'
                    className='password-toggle'
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </button>
                </div>

                {currState === "Sign Up" && (
                  <div className='password-input-container'>
                    <input 
                      type={showPassword ? 'text' : 'password'} 
                      name='confirmPassword'
                      placeholder='Confirm Password' 
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )}
              </>
            )}

            {currState === "ForgotPassword" && (
              <input 
                type='email' 
                name='email'
                placeholder='Enter your registered email' 
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            )}
          </div>
          
          <button type='submit' className='login-container-button'>
            {currState === "Login" && "Login"}
            {currState === "Sign Up" && "Create Account"}
            {currState === "ForgotPassword" && "Send Reset Link"}
          </button>
          
          {currState === "Login" && (
            <div className='login-popup-options'>
              <div className='remember-me'>
                <input type='checkbox' id='remember' />
                <label htmlFor='remember'>
                  By continuing, I agree to the terms of use & privacy policy
                </label>
              </div>
              <a 
                href="#forgot-password" 
                className='forgot-password'
                onClick={(e) => {
                  e.preventDefault();
                  switchForm("ForgotPassword");
                }}
              >
                Forgot password?
              </a>
            </div>
          )}

          <p className='toggle-form-link'>
            {currState === "Login" && (
              <>
                Don't have an account? <span onClick={() => switchForm("Sign Up")}>Sign up here</span>
              </>
            )}
            {currState === "Sign Up" && (
              <>
                Already have an account? <span onClick={() => switchForm("Login")}>Login here</span>
              </>
            )}
            {currState === "ForgotPassword" && (
              <>
                Back to <span onClick={() => switchForm("Login")}>Login</span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPopup;
