import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TrackOrder = () => {
  const { orderId } = useParams();
  const [tracking, setTracking] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/tracking/${orderId}`).then((res) => setTracking(res.data));
  }, [orderId]);

  if (!tracking) return <p>Loading tracking details...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Order Tracking</h2>
      <p><strong>Order ID:</strong> {tracking.orderId}</p>
      <p><strong>Status:</strong> {tracking.status}</p>
      <p><strong>Estimated Delivery:</strong> {new Date(tracking.estimatedDelivery).toLocaleDateString()}</p>

      {/* Order Status Progress Bar */}
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className={`h-2.5 rounded-full ${
              tracking.status === "Delivered"
                ? "bg-green-600 w-full"
                : tracking.status === "Out for Delivery"
                ? "bg-orange-600 w-4/5"
                : tracking.status === "Shipped"
                ? "bg-blue-600 w-3/5"
                : tracking.status === "Packed"
                ? "bg-yellow-500 w-2/5"
                : "bg-gray-400 w-1/5"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
