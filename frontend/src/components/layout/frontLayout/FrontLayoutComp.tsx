import React from 'react';
import {useAppStateContext} from "../../../shared/provider/AppStateProvider";
import {Layout, Menu} from 'antd';
import {Link, Outlet, useLocation} from "react-router-dom";
import {
  ABOUT,
  CONTACT,
  FEEDBACK,
  HOMEPAGE,
  LOGIN_ROUTE,
  REGISTER_ROUTE,
  SERVICES
} from "../../../shared/routesConstants";
import {Footer} from "antd/es/layout/layout";
import styles from "./FrontLayout.module.css";
import {feUrl, logoPath} from "../../../base/configs";

const { Header, Content } = Layout;

const FrontLayoutComp = () => {
  const location = useLocation();
  const { logout, user } = useAppStateContext();

  return (
    <div>
      <Layout>
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
          <a href={feUrl} title={feUrl} className={styles.logo} style={{background: `url(${logoPath})`}}> </a>
          <Menu className={styles.menu} theme="dark" mode="horizontal" defaultSelectedKeys={['/']} selectedKeys={[location.pathname]}>
            <Menu.Item key={HOMEPAGE}>
              <Link to={HOMEPAGE}>Home</Link>
            </Menu.Item>
            <Menu.Item key={`/${ABOUT}`}>
              <Link to={ABOUT}>About</Link>
            </Menu.Item>
            <Menu.Item key={`/${SERVICES}`}>
              <Link to={SERVICES}>Services</Link>
            </Menu.Item>
            <Menu.Item key={`/${CONTACT}`}>
              <Link to={CONTACT}>Contact</Link>
            </Menu.Item>
            <Menu.Item key={`/${FEEDBACK}`}>
              <Link to={FEEDBACK}>Feedback</Link>
            </Menu.Item>
            { user && <Menu.Item key="7" onClick={() => logout()} >Logout</Menu.Item> }
            { !user && (
              <>
                <Menu.Item key="8">
                  <Link to={REGISTER_ROUTE}>Register</Link>
                </Menu.Item>
                <Menu.Item key="9">
                  <Link to={LOGIN_ROUTE}>Login</Link>
                </Menu.Item>
              </>
            ) }
            { user?.type === "admin" && (
              <Menu.Item key="8">
                <Link to="/admin/users">Admin</Link>
              </Menu.Item>
            )}
          </Menu>
        </Header>
        <Content className="site-layout" style={{ marginTop: 64, minHeight: "80vh" }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          © Copyright ALGONLP 2022. All Rights Reserved
          <div className="credits">
            Designed by <a href={feUrl}>AlgoNlp</a>
          </div>
        </Footer>
      </Layout>
    </div>
  );
};

export default FrontLayoutComp;
