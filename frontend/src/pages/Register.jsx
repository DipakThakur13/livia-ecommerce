import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      <input type="text" placeholder="Name" className="w-full border p-2 mb-2"
        value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" className="w-full border p-2 mb-2"
        value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" className="w-full border p-2 mb-2"
        value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister} className="w-full bg-purple-600 text-white py-2 rounded">
        Register
      </button>
    </div>
  );
};

export default Register;
