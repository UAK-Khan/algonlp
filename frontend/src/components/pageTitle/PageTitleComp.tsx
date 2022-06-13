import React from 'react';
import styles from "./PageTitle.module.css";
import {Typography} from 'antd';

type PropTypes = {
  title: string,
}

const PageTitleComp = ({title}: PropTypes) => {
  return (
    <div className={styles.container}>
      <Typography.Title level={1} className={styles.sitePageHeader}>
        <span className={styles.title}>
          {title}
        </span>
      </Typography.Title>
    </div>
  );
};

export default PageTitleComp;
