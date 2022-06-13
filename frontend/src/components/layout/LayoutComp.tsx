import React, {useState} from 'react';
import { Layout } from 'antd';
import DrawerComp from "./drawer/DrawerComp";
import HeaderComp from "./header/HeaderComp";
import styles from "./Layout.module.css";
import BreadcrumbComp from "./header/breadcrumb/BreadcrumbComp";

const { Content } = Layout;

type PropTypes = {
  children: JSX.Element
}

const LayoutComp = ({ children }: PropTypes) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const onToggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <Layout className={`${styles.layout} admin-layout`}>
      <HeaderComp />
      <Layout>
        <DrawerComp drawerOpen={drawerOpen} onToggleDrawer={onToggleDrawer} />
        <Content className={styles.content}>
          <BreadcrumbComp />
          <div className={styles.contentDisplay}>
            {children}
          </div>
        </Content>
        {/*<FooterComp />*/}
      </Layout>
    </Layout>
  );
};

export default LayoutComp;
