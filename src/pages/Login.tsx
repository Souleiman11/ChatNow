import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { email, password } = formData;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Handle successful login (redirect or additional logic)
      console.log("User logged in successfully:", user);

      // Redirect to the home page
      navigate("/");
    } catch (error) {
      console.error(
        "Login failed:",
        (error as Error)?.message || "An error occurred"
      );
    }
  };

  return (
    <div className="loginForm">
      <div className="logo">
        <h1>
          Chat<span>Now</span>
        </h1>
        <img src={logo} alt="" />
      </div>
      <div className="heading">
        <h2>Sign in</h2>
        <p>Welcome back! Please sign in to your account.</p>
      </div>
      <form onSubmit={handleLogin}>
        {/* Email Input */}
        <div className="formGroup">
          <label htmlFor="email">Email</label>
          <div className="inputGroup">
            <MailOutlineRoundedIcon className="inputIcon" />
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              placeholder="name@example.com"
              value={formData.email}
              required
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="formGroup">
          <label htmlFor="password">Password</label>
          <div className="inputGroup">
            <HttpsOutlinedIcon className="inputIcon" />
            <input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              name="password"
              autoComplete="current-password"
              placeholder="********"
              value={formData.password}
              required
              onChange={handleInputChange}
            />
            <div className="show_hide" onClick={togglePasswordVisibility}>
              {isPasswordVisible ? (
                <VisibilityOffOutlinedIcon className="inputIcon" />
              ) : (
                <RemoveRedEyeOutlinedIcon className="inputIcon" />
              )}
            </div>
          </div>
        </div>

        {/* Remember Me & Forget Password */}
        <div className="remember_forget">
          <div className="formCheckbox">
            <input
              type="checkbox"
              id="rememberMe"
              className="checkbox"
              name="rememberMe"
            />
            <label htmlFor="rememberMe">Remember me</label>
          </div>
          <Link to="/forgot-password" className="forgetPassword">
            Forget password?
          </Link>
        </div>

        {/* Submit Button */}
        <button className="formButton" type="submit">
          Sign in
        </button>

        {/* Sign Up Link */}
        <span>
          Don’t have an account yet? <Link to="/register">Sign up</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
