import { useEffect, useState } from "react";
import axios from "axios";

const AdminOrderTracking = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/orders").then((res) => setOrders(res.data));
  }, []);

  const handleStatusUpdate = async (orderId, status) => {
    await axios.put(`http://localhost:5000/api/tracking/${orderId}`, { status });
    setOrders((prev) => prev.map((o) => (o._id === orderId ? { ...o, status } : o)));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Manage Order Tracking</h2>
      {orders.map((order) => (
        <div key={order._id} className="border p-4 mt-2 rounded">
          <p><strong>Order ID:</strong> {order._id}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <select className="border p-2 mt-2" onChange={(e) => handleStatusUpdate(order._id, e.target.value)}>
            <option value="Placed">Placed</option>
            <option value="Packed">Packed</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default AdminOrderTracking;
