import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaTruck, FaCheckCircle, FaBoxOpen, FaShippingFast, FaMapMarkerAlt } from "react-icons/fa";

const OrderTracking = () => {
  const { orderId } = useParams();
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrackingData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/tracking/${orderId}`);
        setTrackingData(res.data);
      } catch (error) {
        console.error("Error fetching tracking data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrackingData();

    // Auto-refresh tracking details every 10 seconds
    const interval = setInterval(fetchTrackingData, 10000);
    return () => clearInterval(interval);
  }, [orderId]);

  if (loading) return <p className="text-center mt-6">Loading tracking details...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Track Your Order</h2>

      {/* Order Summary */}
      <div className="border rounded-lg shadow p-4 bg-white">
        <p><strong>Order ID:</strong> {trackingData?.orderId}</p>
        <p><strong>Current Status:</strong> {trackingData?.status}</p>
        <p><strong>Estimated Delivery:</strong> {trackingData?.estimatedDelivery}</p>
        <p><strong>Tracking ID:</strong> {trackingData?.trackingId}</p>
        <p><strong>Courier:</strong> {trackingData?.courierPartner} ({trackingData?.courierContact})</p>
      </div>

      {/* Order Status Progress Bar */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Order Status</h3>
        <div className="flex items-center justify-between">
          {trackingSteps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              {trackingData?.status === step.label ? <FaCheckCircle size={24} className="text-green-500" /> : step.icon}
              <span className={`mt-2 text-sm ${trackingData?.status === step.label ? "font-bold text-green-600" : "text-gray-400"}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 rounded mt-2 relative">
          <div className="h-full bg-green-600 rounded transition-all duration-500" style={{ width: getProgressWidth(trackingData?.status) }}></div>
        </div>
      </div>

      {/* Map for Delivery Location */}
      <div className="mt-6 border p-4 rounded-lg shadow bg-white">
        <h3 className="text-lg font-semibold mb-2">Delivery Location</h3>
        <div className="flex items-center gap-4">
          <FaMapMarkerAlt size={24} className="text-red-500" />
          <p>{trackingData?.deliveryAddress}</p>
        </div>
      </div>
    </div>
  );
};

// Steps with Icons
const trackingSteps = [
  { label: "Placed", icon: <FaBoxOpen size={24} className="text-gray-400" /> },
  { label: "Processing", icon: <FaTruck size={24} className="text-gray-400" /> },
  { label: "Shipped", icon: <FaShippingFast size={24} className="text-gray-400" /> },
  { label: "Out for Delivery", icon: <FaTruck size={24} className="text-gray-400" /> },
  { label: "Delivered", icon: <FaCheckCircle size={24} className="text-gray-400" /> },
];

// Progress Bar Width Calculation
function getProgressWidth(status) {
  const progressMap = {
    "Placed": "10%",
    "Processing": "30%",
    "Shipped": "60%",
    "Out for Delivery": "90%",
    "Delivered": "100%",
  };
  return progressMap[status] || "10%";
}

export default OrderTracking;
