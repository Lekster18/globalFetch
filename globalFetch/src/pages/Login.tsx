import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import useFetch from "../hooks/useFetch";
import { useContext, useState } from "react";
import UserContext from "../context/user";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

type LoginData = {
  name: string;
  password: string;
};

const Login: React.FC = () => {
  const fetchData = useFetch();

  const userCtx = useContext(UserContext);
  const nav = useNavigate();

  const handleLogin = async (vals: LoginData) => {
    console.log(vals);
    const res = await fetchData("/auth/login", "POST", vals);

    if (res.ok) {
      console.log(res);
      userCtx.setAccessToken(res.data.access);
      const decoded: any = jwtDecode(res.data.access);
      userCtx.setRole(decoded.role);
      userCtx.setName(decoded.name);
      nav("/browse");
    } else {
      alert(JSON.stringify(res.data));
    }
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={handleLogin}
    >
      <h1>Login</h1>
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="/register">register now!</a>
      </Form.Item>
    </Form>
  );
};

export default Login;
