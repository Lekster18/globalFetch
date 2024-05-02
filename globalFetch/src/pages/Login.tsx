import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import useFetch from "../hooks/useFetch";
import { useContext } from "react";
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
    const res = await fetchData("/auth/login", "POST", vals, "");

    if (res.ok) {
      userCtx.setAccessToken(res.data.access);
      const decoded: any = jwtDecode(res.data.access);
      userCtx.setRole(decoded.role);
      userCtx.setName(decoded.name);
      if (decoded.role === "User") {
        nav("/browse");
      } else if (decoded.role === "Admin") {
        nav("/account");
      }
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
      style={{ maxWidth: "300px", margin: "auto" }}
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
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        <br />
        Or <a href="/register">register now!</a>
      </Form.Item>
    </Form>
  );
};

export default Login;
