const Register = () => {
  return (
    <div>
      <h1>Sign up</h1>
      <h4>Username*</h4>
      <input type="text" className="col-md-1" />
      <h4>Email*</h4>
      <input type="text" className="col-md-1" />
      <h4>Password*</h4>
      <input type="text" className="col-md-1" />
      <h4>Confirm Password*</h4>
      <input type="text" className="col-md-1" />
      <h4>Country of Residence*</h4>
      <input type="text" className="col-md-1" />
      <h4>Role*</h4>
      <select className="col-md-1">
        <option value="">Select Role</option>
        <option value="User">User</option>
        <option value="Admin">Admin</option>
      </select>
      <button>Register</button>
    </div>
  );
};

export default Register;
