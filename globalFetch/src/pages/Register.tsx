import useFetch from "../hooks/useFetch";
import { Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";

type RegisterData = {
  id: number;
  name: string;
  email: string;
  country: string;
  city: string;
  role: string;
  password: string;
};

const RegisterDisplay: React.FC = () => {
  const fetchData = useFetch();
  const nav = useNavigate();
  const [form] = useForm();

  const addUser = async (vals: RegisterData) => {
    const res = await fetchData("/auth/register", "POST", vals, "");

    if (res.ok) {
      alert("Successfully added user.");
      nav("/");
    } else {
      alert(JSON.stringify(res.data));
      console.log(res.data);
    }
  };

  return (
    <Form form={form} onFinish={addUser}>
      <h1>Sign up</h1>
      <Form.Item label="Username" name={"name"} rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name={"password"}
        rules={[{ required: true }]}
      >
        <input />
      </Form.Item>
      <Form.Item
        label="Confirm Password"
        key={"password"}
        rules={[{ required: true }]}
      >
        <input />
      </Form.Item>
      <Form.Item
        label="Country of Residence"
        name={"country"}
        rules={[{ required: true }]}
      >
        <input />
      </Form.Item>
      <Form.Item label="City" name={"city"} rules={[{ required: true }]}>
        <input />
      </Form.Item>
      <Form.Item label="Role" name={"role"} rules={[{ required: true }]}>
        <select className="col-md-1">
          <option value="">Select Role</option>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
      </Form.Item>
      <Form.Item>
        <button type="submit">Register</button>
      </Form.Item>
    </Form>
  );
};

export default RegisterDisplay;
