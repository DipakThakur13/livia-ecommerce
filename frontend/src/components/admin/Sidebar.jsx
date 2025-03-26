import { useAuth } from "../../context/AuthContext";

const Sidebar = ({ setActiveTab }) => {
  const { logout } = useAuth();

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen p-6">
      <h3 className="text-lg font-bold mb-4">Admin Panel</h3>
      <ul className="space-y-4">
        <li onClick={() => setActiveTab("orders")} className="cursor-pointer hover:text-purple-400">Orders</li>
        <li onClick={() => setActiveTab("products")} className="cursor-pointer hover:text-purple-400">Products</li>
        <li onClick={() => setActiveTab("users")} className="cursor-pointer hover:text-purple-400">Users</li>
        <li onClick={() => setActiveTab("sales")} className="cursor-pointer hover:text-purple-400">Sales Analytics</li>
      </ul>
      <button onClick={logout} className="mt-6 bg-red-600 text-white p-2 rounded w-full">Logout</button>
    </div>
  );
};

export default Sidebar;
