import React from 'react';
import {Layout} from "antd";
import MenuComp from "./menu/MenuComp";
import styles from "./Header.module.css";

const { Header } = Layout;

const HeaderComp = () => {
  return (
    <>
      <Header className={styles.header}>
        <div className="c-d-flex">
          <div className={styles.logo}>
            <span className={styles.logoSpan}>
              Admin Panel
            </span>
          </div>
          <div>
            <MenuComp />
          </div>
        </div>
      </Header>
    </>
  );
};

export default HeaderComp;
