import { useRef, useState } from "react";
import styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";

interface User {
  name: string;
  email: string;
  password: string;
}

export const Registration: React.FC<User> = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  function addUser(name: string, email: string, password: string): void {
    const usersList: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    usersList.push({
      name,
      email,
      password,
    });
    localStorage.setItem("users", JSON.stringify(usersList));
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  const Validation = (): void => {
    const isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    localStorage.setItem("users", JSON.stringify([]));

    if (name === "") {
      nameRef.current?.style.setProperty("border", "1px solid red");
    } else {
      nameRef.current?.style.setProperty("border", "2px solid green");
    }

    if (email === "") {
      emailRef.current?.style.setProperty("border", "1px solid red");
    }

    if (email !== "" && !email.match(isEmail)) {
      emailRef.current?.style.setProperty("border", "1px solid red");
      setEmail("");
      emailRef.current?.setAttribute("placeholder", "Please provide valid email");
    } else {
      emailRef.current?.style.setProperty("border", "2px solid green");
      emailRef.current?.setAttribute("placeholder", "Enter email");
    }

    if (password === "") {
      passwordRef.current?.style.setProperty("border", "1px solid red");
    }

    if (confirmPassword === "") {
      confirmPasswordRef.current?.style.setProperty("border", "1px solid red");
    }

    if (password.length < 8) {
      passwordRef.current?.style.setProperty("border", "1px solid red");
      setPassword("");
      passwordRef.current?.setAttribute("placeholder", "Your password must be at least 8 characters");
    } else {
      passwordRef.current?.style.setProperty("border", "2px solid green");
      passwordRef.current?.setAttribute("placeholder", "Enter password");
    }

    if (password.length >= 8 && confirmPassword === "") {
      confirmPasswordRef.current?.setAttribute("placeholder", "Confirm your password");
    }

    if (password.length >= 8 && confirmPassword !== "" && confirmPassword !== password) {
      confirmPasswordRef.current?.style.setProperty("border", "1px solid red");
      setConfirmPassword("");
      confirmPasswordRef.current?.setAttribute("placeholder", "Please provide a password matching your password");
    } else {
      confirmPasswordRef.current?.style.setProperty("border", "2px solid green");
      confirmPasswordRef.current?.setAttribute("placeholder", "Confirm your password");
    }

    if (password.length >= 8 && confirmPassword === "") {
      confirmPasswordRef.current?.setAttribute("placeholder", "Confirm your password");
    }

    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      password.length >= 8 &&
      confirmPassword === password
    ) {
      addUser(name, email, password);
      navigate("/login");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.signupTitle}>Sign up</h1>

        <div className={styles.signupForm}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              Validation();
            }}
          >
            <input
              ref={nameRef}
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name={name}
              placeholder="Enter name"
            />

            <input
              ref={emailRef}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name={email}
              placeholder="Enter email"
            />
            <input
              ref={passwordRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name={password}
              placeholder="Enter password"
            />
            <input
              ref={confirmPasswordRef}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name={password}
              placeholder="Confirm password"
            />

            <button type="submit">Sign up</button>
            <span className={styles.info}>
              Already have an account ?
              <a href="/login" className={styles.toLogin}>
                Login
              </a>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};
