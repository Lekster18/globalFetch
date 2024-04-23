import { useState } from "react";

const Checkbox = (props) => {
  return (
    <input
      type="checkbox"
      checked={props.val}
      onClick={() => {
        props.setValue(!props.val);
      }}
    />
  );
};

const Login = () => {
  const [val, setVal] = useState(false);
  return (
    <div>
      <h1> Login </h1>
      <input type="text" placeholder="Username" className="col-md-1" />
      <input type="text" placeholder="Password" className="col-md-1" />
      <button>Login</button>
      <h4>Remember me</h4>
      <Checkbox value={val} setValue={setVal}></Checkbox>
      <h4>Not a member? Sign up </h4>
      <a href="/register">here</a>
    </div>
  );
};

export default Login;
