import { useEffect, useState } from "react";
import axios from "axios";

const OrdersTable = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/admin/orders").then((res) => setOrders(res.data));
  }, []);

  const updateStatus = async (id, newStatus) => {
    await axios.put(`/api/admin/orders/${id}`, { status: newStatus });
    setOrders(orders.map(order => order._id === id ? { ...order, status: newStatus } : order));
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h3 className="text-xl font-semibold mb-4">Orders</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Order ID</th>
            <th className="p-2">Customer</th>
            <th className="p-2">Total</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id} className="border-b">
              <td className="p-2">{order._id}</td>
              <td className="p-2">{order.customer}</td>
              <td className="p-2">₹{order.totalAmount}</td>
              <td className="p-2">{order.status}</td>
              <td className="p-2">
                <select onChange={(e) => updateStatus(order._id, e.target.value)} value={order.status} className="border p-1">
                  <option value="Placed">Placed</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
