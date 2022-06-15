import React from 'react';
import {Layout, Menu} from 'antd';
import {
  AliwangwangOutlined,
  AntDesignOutlined,
  CodeSandboxOutlined,
  CommentOutlined,
  ContainerOutlined,
  DeploymentUnitOutlined,
  MessageOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {Link} from "react-router-dom";
import {
  ADMIN_ABOUT,
  ADMIN_CONTACTS,
  ADMIN_FEEDBACKS,
  ADMIN_MESSAGES,
  ADMIN_METADATA,
  ADMIN_PACKAGES,
  ADMIN_PORTFOLIO,
  ADMIN_SERVICES,
  ADMIN_USERS
} from "../../../shared/routesConstants";

const { Sider } = Layout;
const { SubMenu } = Menu;

type PropTypes = {
  drawerOpen: boolean;
  onToggleDrawer: () => void;
}

const menuItems = [
  {title: "Users", to: ADMIN_USERS, icon: <UserOutlined/>},
  {title: "Messages", to: ADMIN_MESSAGES, icon: <MessageOutlined/>},
  {title: "Feedbacks", to: ADMIN_FEEDBACKS, icon: <CommentOutlined/>},
  {title: "Contacts", to: ADMIN_CONTACTS, icon: <CommentOutlined/>}
]

const manageMenuItems = [
  { title: "Service", to: ADMIN_SERVICES, icon: <DeploymentUnitOutlined />},
  // { title: "Portfolio", to: ADMIN_PORTFOLIO, icon: <AntDesignOutlined />},
  { title: "Metadata", to: ADMIN_METADATA, icon: <ContainerOutlined />},
  { title: "Packages", to: ADMIN_PACKAGES, icon: <CodeSandboxOutlined />},
  { title: "About", to: ADMIN_ABOUT, icon: <AliwangwangOutlined />}
]

const DrawerComp = ({ drawerOpen, onToggleDrawer }: PropTypes) => {
  return (
    <Sider collapsible collapsed={drawerOpen} onCollapse={onToggleDrawer}>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        {menuItems.map((item, idx) => (
          <Menu.Item key={idx + 1} icon={item.icon}>
            <Link to={item.to}>{item.title}</Link>
          </Menu.Item>
        ))}
        <SubMenu key="sub1" icon={<SettingOutlined />} title="Manage">
          {manageMenuItems.map((item, idx) => (
            <Menu.Item key={idx + item.title} icon={item.icon}>
              <Link to={item.to}>{item.title}</Link>
            </Menu.Item>
          ))}
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default DrawerComp;
