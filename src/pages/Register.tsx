import React, { useState } from 'react';
import styles from './Register.module.css';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: ''
  });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, username: value }));
    
    if (value.length < 3) {
      setErrors(prev => ({ ...prev, username: 'Username must be at least 3 characters' }));
    } else {
      setErrors(prev => ({ ...prev, username: '' }));
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, email: value }));
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email' }));
    } else {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

/**
 * Handles the change event for the password input field.
 * Updates the form data with the new password value and sets validation errors if the password does not meet the required criteria.
 *
 * Password validation criteria:
 * - Must be at least 8 characters long
 * - Must contain at least one number
 * - Must contain at least one uppercase letter
 * - Must contain at least one special character (!@#$%^&*)
 *
 * @param {React.ChangeEvent<HTMLInputElement>} e - The change event triggered by the password input field.
 */
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, password: value }));
   
    // password must be at least 8 characters, 1 number, 1 uppercase letter, 1 special character
    if (value.length < 8) {
      setErrors(prev => ({ ...prev, password: 'Password must be at least 8 characters' }));
    } else if (!/\d/.test(value)) {
      setErrors(prev => ({ ...prev, password: 'Password must contain at least one number' }));
    } else if (!/[A-Z]/.test(value)) {
      setErrors(prev => ({ ...prev, password: 'Password must contain at least one uppercase letter' }));
    } else if (!/[!@#$%^&*]/.test(value)) {
      setErrors(prev => ({ ...prev, password: 'Password must contain at least one special character' }));
    } else {
      setErrors(prev => ({ ...prev, password: '' }));
    }

    // if (value.length < 6) {
      

    //   setErrors(prev => ({ ...prev, password: 'Password must be at least 6 characters' }));
    // } else if (!/\d/.test(value)) {
    //   setErrors(prev => ({ ...prev, password: 'Password must contain at least one number' }));
    // } else {
    //   setErrors(prev => ({ ...prev, password: '' }));
    // }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!errors.username && !errors.email && !errors.password) {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <div className={styles.form}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleUsernameChange}
          />
          {errors.username && <span className={styles.error}>{errors.username}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleEmailChange}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handlePasswordChange}
          />
          {errors.password && <span className={styles.error}>{errors.password}</span>}
        </div>
        <button 
          type="submit" 
          className={styles.submitButton}
          disabled={!!errors.username || !!errors.email || !!errors.password}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;