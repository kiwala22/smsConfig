import React, { useState } from 'react';
import { Routes, Route } from "react-router-dom";
const Home = React.lazy(() => import('./home'));
const Loading = () => <p>Loading ...</p>;
import { Link } from 'react-router-dom';
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

const { Header, Sider, Content } = Layout;

export default function Root(props: any) {
  const [collapsed, setCollapsed] = useState(false);

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
            <Menu.Item key="/login/" icon={<LogoutOutlined />}>
              <Link to={"/login/"}>Sign Out</Link>
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