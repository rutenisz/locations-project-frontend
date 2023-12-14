import React, { ReactNode } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./styles.module.css";

type PageTemplateType = {
  children: ReactNode;
};

const PageTemplate: React.FC<PageTemplateType> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <div className={styles.main}>{children}</div>
      <Footer />
    </div>
  );
};

export default PageTemplate;
