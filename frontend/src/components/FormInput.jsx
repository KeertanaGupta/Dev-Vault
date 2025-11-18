import React from 'react';
import styles from './FormInput.module.css';

function FormInput({ id, label, icon: Icon, ...props }) {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <span className={styles.icon}>
          <Icon size={16} />
        </span>
        <input id={id} className={styles.input} {...props} />
      </div>
    </div>
  );
}

export default FormInput;