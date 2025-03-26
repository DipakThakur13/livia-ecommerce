import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import OrdersTable from "../components/admin/OrdersTable";
import ProductsTable from "../components/admin/ProductsTable";
import UsersTable from "../components/admin/UsersTable";
import SalesChart from "../components/admin/SalesChart";
import { useState, useEffect } from "react";

const AdminDashboard = () => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    if (!admin) navigate("/admin/login");
  }, [admin, navigate]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar setActiveTab={setActiveTab} logout={logout} />

      {/* Main Content */}
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
        {activeTab === "orders" && <OrdersTable />}
        {activeTab === "products" && <ProductsTable />}
        {activeTab === "users" && <UsersTable />}
        {activeTab === "sales" && <SalesChart />}
      </div>
    </div>
  );
};

export default AdminDashboard;
