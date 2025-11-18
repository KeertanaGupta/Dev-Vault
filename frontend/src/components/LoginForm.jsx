import React, { useState } from 'react';
import FormInput from './FormInput';
import FormButton from './FormButton';
import { Mail, Lock } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext'; // 1. Import useAuth

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { setAuth } = useAuth(); // 2. Get the 'setAuth' function

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post('/api/users/login', {
        email,
        password,
      });

      toast.success('Logged in successfully! Welcome back.');

      // 3. Save user info to global state!
      setAuth(response.data);

      navigate('/');

    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Login failed.';
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // ... (keep the same return JSX)
  return (
    <form onSubmit={handleSubmit}>
      <FormInput
        id="login-email"
        label="Email"
        type="email"
        placeholder="you@example.com"
        icon={Mail}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <FormInput
        id="login-password"
        label="Password"
        type="password"
        placeholder="••••••••"
        icon={Lock}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <FormButton type="submit" isLoading={isLoading}>
        Sign In
      </FormButton>
    </form>
  );
}

export default LoginForm;