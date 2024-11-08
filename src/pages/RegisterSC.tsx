import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Error = styled.span`
  color: #dc3545;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
`;

const RegisterSC: React.FC = () => {
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

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, password: value }));

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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!errors.username && !errors.email && !errors.password) {
      console.log('Form submitted:', formData);
    }
  };

  return (
    <Form>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">Username:</Label>
          <Input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleUsernameChange}
          />
          {errors.username && <Error>{errors.username}</Error>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleEmailChange}
          />
          {errors.email && <Error>{errors.email}</Error>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handlePasswordChange}
          />
          {errors.password && <Error>{errors.password}</Error>}
        </FormGroup>
        <SubmitButton 
          type="submit"
          disabled={!!errors.username || !!errors.email || !!errors.password}
        >
          Register
        </SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterSC;