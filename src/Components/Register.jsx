import { useState } from "react";
import { useNavigate, Link } from 
"react-router-dom";

const Register = () => {
 const navigate = useNavigate()
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",

  });
  
  // to store value in local storage
  const handleSubmit = (e) =>{
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(input))
    navigate('/login');
  };

  return(
    <div  className="auth-form-container">
      <h2>Register</h2>
    <form className="register-form" onSubmit={handleSubmit}>

      {/* input-name */}
      <label htmlFor="name">Full Name</label>
      <input type="text" value={input.name} onChange={(e) => setInput({...input,[e.target.name] : e.target.value})} name="name" placeholder="Full Name"/>

      {/* input-email */}
    <label htmlFor="email">email</label>
      <input value={input.email} onChange={(e) => setInput({...input,[e.target.name] : e.target.value})} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>

      {/* input-password */}
    <label htmlFor="password">password</label>
      <input value={input.password} onChange={(e) => setInput({...input,[e.target.name] : e.target.value})} type="password" placeholder="************" id="password" name="password"/>
      <button type="submit">Log In</button>
    </form>

    <br />

    <p>Already have an account? <Link className="link" to="/login">Login here.</Link></p>

 
  </div>
  )
};

export default Register;