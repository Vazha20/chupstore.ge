'use client';

import { useState } from "react";
import Link from "next/link";
import styles from './Header.module.css';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import Search from "../Search/Search";
import Cart from "../Cart/Cart";
import Login from "../Login/Login";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleLogin = () => setLoginOpen(!loginOpen);

  return (
    <>
      <header className={styles.container}>
        <div className={`${styles.flex} ${styles.left}`}>
          <Link href='/'>მთავარი</Link>
          <Link href='/about'>ჩვენ შესახებ</Link>
          <Link href='/contact'>კონტაქტი</Link>
        </div>

        <div className={styles.center}>
          <Link href="/">
            <span className={styles.logo}>CHUPSTORE</span>
          </Link>
        </div>

        <div className={`${styles.flex} ${styles.right}`}>
          <Search />
          <Cart />
          <button className={styles.login} onClick={toggleLogin}>შესვლა</button>
        </div>

        <div className={styles.mobileHeader}>
          <div className={styles.burger} onClick={toggleMenu}>
            <MenuOutlined style={{ fontSize: '24px' }} />
          </div>

          <div className={styles.mobileLogo}>
            <Link href="/">
              <span className={styles.logo}>CHUPSTORE</span>
            </Link>
          </div>

          <Search />
          <Cart />
        </div>
      </header>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.active : ''}`}>
        <div className={styles.flextwo}>
          <Link onClick={() => setMenuOpen(false)} href="/">
            <span className={styles.logo}>CHUPSTORE</span>
          </Link>
          <div className={styles.burger} onClick={toggleMenu}>
            {menuOpen && <CloseOutlined style={{ fontSize: '24px' }} />}
          </div>
        </div>

        <Link href='/' onClick={() => setMenuOpen(false)}>მთავარი</Link>
        <Link href='/about' onClick={() => setMenuOpen(false)}>ჩვენ შესახებ</Link>
        <Link href='/contact' onClick={() => setMenuOpen(false)}>კონტაქტი</Link>

        <button className={styles.login} onClick={toggleLogin}>შესვლა</button>
      </div>

      {loginOpen && (
        <Login onClose={toggleLogin} />
      )}

      <hr />
    </>
  );
}
