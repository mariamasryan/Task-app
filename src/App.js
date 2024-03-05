import React from "react";
import { TodoPage } from "./pages/todoPage";
import styles from "./styles.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "components/login";
import { Registration } from "components/registration";

export const App = () => {
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Registration />} />
        <Route path="/app" element={<TodoPage />} />
      </Routes>
    </div>
  );
};
