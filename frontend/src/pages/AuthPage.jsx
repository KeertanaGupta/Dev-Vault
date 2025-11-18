import React, { useState } from 'react';
import styles from './AuthPage.module.css';
import { Lock, UserPlus } from 'lucide-react';

// 1. Import our new form components
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

function AuthPage() {
  const [authMode, setAuthMode] = useState('login');

  return (
    <div className={styles.authPage}>
      <div className={styles.authContainer}>
        {/* === This is the "Yarn-Inspired" Hero Section === */}
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Your Code.
            <br />
            Your Commands.
            <br />
            <span className={styles.highlight}>Instantly.</span>
          </h1>
          <p className={styles.subtitle}>
            Welcome to <span className={styles.logoText}>Dev Vault</span>. Stop
            searching, start pasting. Your personal snippet manager.
          </p>
        </div>

        {/* === This is the Form Section === */}
        <div className={styles.formArea}>
          <div className={styles.toggleContainer}>
            <button
              className={`${styles.toggleButton} ${
                authMode === 'login' ? styles.active : ''
              }`}
              onClick={() => setAuthMode('login')}
            >
              <Lock size={14} />
              <span>Log In</span>
            </button>
            <button
              className={`${styles.toggleButton} ${
                authMode === 'register' ? styles.active : ''
              }`}
              onClick={() => setAuthMode('register')}
            >
              <UserPlus size={14} />
              <span>Sign Up</span>
            </button>
          </div>

          {/* 2. Replace the placeholders with our new components */}
          <div className={styles.formWrapper}>
            {authMode === 'login' ? <LoginForm /> : <RegisterForm />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;