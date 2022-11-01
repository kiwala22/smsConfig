import React, { useState, useContext, useEffect } from 'react';
import { notification } from 'antd';
import { Routes, Route } from "react-router-dom";
const Home = React.lazy(() => import('./home'));
const Loading = () => <p>Loading ...</p>;
import { Link, useNavigate } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { UserContext } from '..';
import { useHttpRequest } from '../components/api';

const { Header, Sider, Content } = Layout;

export default function Root(props: any) {
  const [collapsed, setCollapsed] = useState(false);
  const history = useNavigate();
  const userSession = useContext(UserContext);
  const http = useHttpRequest();

  useEffect(() => checkSessionExpiry(), []);

  const checkSessionExpiry = () => {
    console.log(userSession);
    if (userSession?.message != "Authorized") {
      history("/login")
      notification.error({ message: "Unauthorized. Sign In First" })
      // window.location.reload()
    }
    // console.log(userSession?.message);
  }

  const logout = () => {
    http.delete('/users/sign_out')
      .then((response) => {
        history("/");
        notification.success({ message: response?.message })
        window.location.reload();
      })
      .catch((error) => {
        notification.error({ message: error?.message })
      });
  }

  return (
    <>
      <Layout>
        <Sider zeroWidthTriggerStyle={{ marginTop: 35 }} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['/']}
          >
            <Menu.Item key="/" icon={<BarChartOutlined />}>
              <Link to={"/"}>Home</Link>
            </Menu.Item>
            <Menu.Item key="/login/" icon={<LogoutOutlined />} onClick={logout}>
              Sign Out
            </Menu.Item>
          </Menu>
          {/* <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <BarChartOutlined />,
                label: 'Home',
              },
              {
                key: '2',
                icon: <LogoutOutlined />,
                label: 'Sign Out',
              },
            ]}
          /> */}
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 800,
            }}
          >
            <React.Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home arg="Welcome Admin!" />}></Route>
              </Routes>
            </React.Suspense>
          </Content>
        </Layout>
      </Layout>
    </>
  )
}