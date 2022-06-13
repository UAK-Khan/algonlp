import React from 'react';
import styles from "../Header.module.css";
import {Breadcrumb} from "antd";
import {useLocation} from "react-router-dom";

const getPaths = (path: string):string[] => {
  if (path) return path.split("/").map((p) => p.toUpperCase());
  else return [];
}

const BreadcrumbComp = () => {
  const history = useLocation();

  return (
    <Breadcrumb className={styles.breadcrumb}>
      {getPaths(history.pathname).map((path) => (
        <Breadcrumb.Item key={path}>{path}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadcrumbComp;
