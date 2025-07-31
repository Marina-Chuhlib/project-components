'use client';

import React, { useState } from 'react';
import { FiEye, FiEyeOff, FiX } from 'react-icons/fi';

import styles from './Input.module.css';

export type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  clearable?: boolean;
  type?: 'text' | 'password' | 'number';
};

export function Input({ value, onChange, placeholder, clearable, type = 'text' }: InputProps) {
  const [show, setShow] = useState(false);
  const inputType = type === 'password' && show ? 'text' : type;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val.startsWith('-')) return;
    onChange(e);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === '-') e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Input Component</h1>
      <div className={styles.inputWrapper}>
        <input
          type={inputType}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={styles.inputField}
        />
        {clearable && value && (
          <button
            onClick={() => onChange({ target: { value: '' } } as any)}
            className={styles.clearButton}
          >
            <FiX size={20} color="#6f986f" />
          </button>
        )}

        {type === 'password' && (
          <button onClick={() => setShow(!show)} className={styles.toggleButton}>
            {show ? <FiEyeOff size={20} color="#6f986f" /> : <FiEye size={20} color="#6f986f" />}
          </button>
        )}
      </div>
    </div>
  );
}
