'use client';

import React, { useState, useCallback } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import styles from './Login.module.css';

interface LoginProps {
  onClose: () => void;
}

export default function Login({ onClose }: LoginProps) {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      setSuccess('');

      try {
        // Simple local validation
        if (isRegister) {
          if (!username || !email || !password) {
            setError('გთხოვთ შეავსოთ ყველა ველი');
            return;
          }

          setSuccess('რეგისტრაცია წარმატებით დასრულდა!');
          setTimeout(() => {
            onClose();
          }, 2000);
        } else {
          if (!email || !password) {
            setError('გთხოვთ შეავსოთ ყველა ველი');
            return;
          }

          setSuccess('შესვლა წარმატებით შესრულდა!');
          setTimeout(() => {
            onClose();
          }, 1000);
        }
      } catch (err: any) {
        setError('შეცდომა მოხდა, სცადეთ თავიდან');
      }
    },
    [isRegister, username, email, password, onClose]
  );

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>{isRegister ? 'რეგისტრაცია' : 'შესვლა'}</h2>
          <CloseOutlined onClick={onClose} className={styles.closeIcon} />
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          {isRegister && (
            <input
              type="text"
              placeholder="მომხმარებლის სახელი"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="off"
            />
          )}
          <input
            type="email"
            placeholder="ელ. ფოსტა"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="პაროლი"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="off"
          />
          <button type="submit">{isRegister ? 'რეგისტრაცია' : 'შესვლა'}</button>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}

          <p className={styles.switchText}>
            {isRegister ? 'უკვე გაქვს ანგარიში?' : 'არ გაქვს ანგარიში?'}{' '}
            <span
              onClick={() => setIsRegister(!isRegister)}
              style={{ cursor: 'pointer' }}
            >
              {isRegister ? 'შესვლა' : 'დარეგისტრირდი'}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
