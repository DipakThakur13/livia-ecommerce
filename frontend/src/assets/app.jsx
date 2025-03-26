import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
    return (
      <ThemeProvider>
        <Navbar />
        <Routes>
          {/* Routes Here */}
        </Routes>
        <Footer />
      </ThemeProvider>
    );
  }

export default App;
