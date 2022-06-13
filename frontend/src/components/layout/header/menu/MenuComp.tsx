import React from 'react';
import {Dropdown, Menu} from 'antd';
import {UserOutlined} from '@ant-design/icons';
import {useAppStateContext} from "../../../../shared/provider/AppStateProvider";
import styles from "./Menu.module.css";
import {HOMEPAGE_ROUTE} from "../../../../shared/routesConstants";

const menu = (
  <Menu>
    <Menu.Item onClick={() => window.location.href = HOMEPAGE_ROUTE} key="1" icon={<UserOutlined/>}>
      Go to Public Site
    </Menu.Item>
  </Menu>
);

const MenuComp = () => {
  const { logout } = useAppStateContext();

  return (
    <div>
      <Dropdown.Button className={styles.dropdown} onClick={() => logout()} overlay={menu} placement="bottomCenter" icon={<UserOutlined />}>
        Logout
      </Dropdown.Button>
    </div>
  );
};

export default MenuComp;
