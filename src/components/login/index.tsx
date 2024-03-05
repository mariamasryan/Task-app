import { useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

interface User {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const validUser = () => {
    const usersList: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    usersList.forEach((user) => {
      if (user.email === email && user.password === password) {
        navigate("/app");
      }
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.signinTitle}>Sign in</h1>

        <div className={styles.signinForm}>
          <form
            onSubmit={(ev) => {
              ev.preventDefault();
              validUser();
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email" 
              placeholder="Enter email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password" 
              placeholder="Enter password"
            />

            <button type="submit">Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );
};
