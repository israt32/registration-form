import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes

const Login = () => {
  
    

  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",

  });

  const handleLogin = (e) =>{
    e.preventDefault();
    const loggeduser = JSON.parse(localStorage.getItem("user"));
    if(input.email === loggeduser.email && input.password === loggeduser.password){
      localStorage.setItem('loggedin', true);
     navigate("/");
    }
    else{
      alert('wrong Email or Password');
    }
  }
  return(
    <div className="auth-form-container">
      <h2 className="title">Login</h2>
      <form className="login-form" onSubmit={handleLogin}>

        {/* input-email */}
      <label htmlFor="email">Email</label>
        <input value={input.email} onChange={(e) => setInput({...input,[e.target.name] : e.target.value})} type="email" placeholder="youremail@gmail.com" id="email" name="email"/>

        {/* input-password */}
      <label htmlFor="password">Password</label>
        <input value={input.password} onChange={(e) => setInput({...input,[e.target.name] : e.target.value})} type="password" placeholder="************" id="password" name="password"/>

        <button type="submit">Log In</button>
      </form>

      
       <p>Don't have an account? <Link className="link" to="/register">Register here.</Link></p>


    </div>
  )
};

// Login.propTypes = {
//   onFormSwitch: PropTypes.func.isRequired,
// };

export default Login;