import React from "react";
import styles from "./styles.module.css";

export const FloatingButton = ({ onPress }) => {
  return (
    <div className={styles.floatingButtonWrapper}>
      <div className={styles.container} onClick={onPress}>
        <span className={styles.button}>+</span>
      </div>
    </div>
  );
};
