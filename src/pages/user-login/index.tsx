import React, { useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import styles from "./styles.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import PageTemplate from "@/components/PageTemplate.tsx/PageTemplate";

const UserLogin = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const onLogin = async () => {
    try {
      const login = {
        email: email,
        password: password,
      };

      const response = await axios.post(
        "http://localhost:3001/users/login",
        login
      );

      if (response.status === 200) {
        Cookie.set("jwt_token", response.data.token);
        router.push("/");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <PageTemplate>
      <div className={styles.formWrapper}>
        <div className={styles.form}>
          <label className={styles.label}>Email:</label>
          <input
            className={styles.input}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className={styles.label}>Password:</label>
          <input
            className={styles.input}
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className={styles.error}>{error}</p>}
          <button className={styles.button} onClick={onLogin}>
            Login
          </button>
        </div>
      </div>
    </PageTemplate>
  );
};

export default UserLogin;
