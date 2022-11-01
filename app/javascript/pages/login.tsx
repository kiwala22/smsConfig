import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, notification } from "antd";
import { useHttpRequest } from '../components/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loading , setLoading] = useState(false);
  const http = useHttpRequest();
  const [form] = Form.useForm();
  const history = useNavigate();

  const handleLogin = (values: any) => {
    setLoading(true);

    http.post("/sign_in", { 
      user: values
    }).then((result) => {
      setLoading(false);
      notification.success({ message: result?.message });
        setLoading(false);
        setTimeout(() => {
          history("/")
          window.location.reload()
        }, 2000);
    }).catch((error) => {
      console.log(error.message);
      setLoading(false);
    })
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
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={handleLogin}
        >
          <Form.Item
            name="email"
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
                loading={loading}
              >
                Log in
              </Button>
            )}
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default Login