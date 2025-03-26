import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/orders/${id}`, {
      headers: { Authorization: localStorage.getItem("token") }
    })
    .then(res => setOrder(res.data))
    .catch(err => console.error("Error fetching order details:", err));
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Order Details</h2>
      <p>Order ID: {order._id}</p>
      <p>Status: <span className="text-purple-600">{order.status}</span></p>
      <p>Total: ₹{order.totalAmount}</p>
      <h3 className="text-lg font-semibold mt-4">Items:</h3>
      <ul className="mt-2">
        {order.items.map((item) => (
          <li key={item._id} className="border p-4 rounded shadow mb-2">
            <img src={item.image} alt={item.name} className="w-16 h-16 inline-block mr-4" />
            <span>{item.name} - ₹{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
