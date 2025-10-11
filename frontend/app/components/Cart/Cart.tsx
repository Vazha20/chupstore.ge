'use client'

import { useState } from "react";
import { ShoppingCartOutlined, CloseOutlined } from '@ant-design/icons';
import styles from './Cart.module.css';

export default function Cart() {
  
  const [cartOpen, setCartOpen] = useState(false);
  const toggleCart = () => setCartOpen(!cartOpen);

  return (
    <>
      <div className={styles.iconBox}>
  <ShoppingCartOutlined onClick={toggleCart} className={styles.icon} />
</div>

{cartOpen && (
  <div className={`${styles.cart} ${cartOpen ? styles.open : ''} ${styles.flex}`}>
    <p>Your cart is empty</p>
    <div className={styles.iconBox}>
      <CloseOutlined onClick={toggleCart} />
    </div>
  </div>
)}

    </>
  );
}
