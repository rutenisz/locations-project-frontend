import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Cookie from "js-cookie";

const Header = () => {
  const [isUserLoggedin, setUserLoggedIn] = useState<boolean | undefined>(
    undefined
  );
  const router = useRouter();

  useEffect(() => {
    const savedToken = Cookie.get("jwt_token");
    setUserLoggedIn(savedToken !== undefined);
  }, []);

  const onLogout = () => {
    Cookie.remove("jwt_token");
    router.push("/user-login");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo}>LOCATIONS</div>
      <nav className={styles.navbar}>
        {isUserLoggedin !== undefined ? (
          <>
            <li>
              <Link className={styles.link} href="/add-object">
                Add Location
              </Link>
            </li>
            <li>
              <button className={styles.logout} onClick={onLogout}>
                Log out
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link className={styles.link} href="/user-login">
              Login
            </Link>
          </li>
        )}
      </nav>
    </div>
  );
};

export default Header;
