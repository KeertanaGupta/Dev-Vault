import React, { useState } from 'react';
import FormInput from './FormInput';
import FormButton from './FormButton';
import { Mail, Lock, User } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext'; // 1. Import useAuth

function RegisterForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setAuth } = useAuth(); // 2. Get the 'setAuth' function

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setIsLoading(true);

    try {
      const response = await axios.post('/api/users/register', {
        name,
        email,
        password,
      });
      
      toast.success('Account created! Welcome!');
      
      // 3. Save user info to global state!
      setAuth(response.data); 

      navigate('/');
      
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // ... (keep the same return JSX)
  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        id="register-name"
        label="Name"
        type="text"
        placeholder="Keertana Gupta"
        icon={User}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <FormInput
        id="register-email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        icon={Mail}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <FormInput
        id="register-password"
        label="Password"
        type="password"
        placeholder="••••••••"
        icon={Lock}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <FormInput
        id="register-confirm-password"
        label="Confirm Password"
        type="password"
        placeholder="••••••••"
        icon={Lock}
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <FormButton type="submit" isLoading={isLoading}>
        Create Account
      </FormButton>
    </form>
  );
}

export default RegisterForm;