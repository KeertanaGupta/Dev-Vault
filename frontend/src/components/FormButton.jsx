import React from 'react';
import styles from './FormButton.module.css';

// This is the component function
function FormButton({ children, isLoading = false, ...props }) {
  return (
    <button className={styles.button} disabled={isLoading} {...props}>
      {isLoading ? 'Loading...' : children}
    </button>
  );
}

// --- THIS IS THE CRITICAL LINE ---
// This makes the component available as a 'default' import
export default FormButton;