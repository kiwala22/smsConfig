import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input } from "antd";
import { Link } from 'react-router-dom';

const Login = () => {
  const [form] = Form.useForm();

  const handleLogin = (values: any) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <Card title="Log in to your account" style={{ width: 350 }}>
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          // onFinish={handleLogin}
          // onSubmit={(e: any) => e.preventDefault()}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <Button
                type="primary"
                htmlType="submit"
                block
                className="login-form-button"
                // loading={loading}
              >
                {/* Log in */}
                <Link to={"/"}>Log In</Link>
              </Button>
            )}
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login