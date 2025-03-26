import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      dispatch(setUser(data.user));
      localStorage.setItem("token", data.accessToken);
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <input type="email" placeholder="Email" className="w-full border p-2 mb-2"
        value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" className="w-full border p-2 mb-2"
        value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin} className="w-full bg-purple-600 text-white py-2 rounded">
        Login
      </button>
    </div>
  );
};

export default Login;
