import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { clearCart } from "../redux/cartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PaymentForm from "../components/PaymentForm";
import AddressSelector from "../components/AddressSelector";
import DeliveryEstimator from "../components/DeliveryEstimator";
import OrderSummary from "../components/OrderSummary";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [pointsDiscount, setPointsDiscount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [discountCode, setDiscountCode] = useState("");

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryCharge = totalAmount >= 500 ? 0 : 50;
  const finalAmount = totalAmount - pointsDiscount - discountAmount + deliveryCharge;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/orders/loyalty", {
        headers: { Authorization: localStorage.getItem("token") },
      })
      .then((res) => setLoyaltyPoints(res.data.loyaltyPoints))
      .catch((err) => console.error(err));
  }, []);

  const applyPoints = () => {
    const maxDiscount = Math.min(loyaltyPoints * 2, totalAmount * 0.2);
    setPointsDiscount(maxDiscount);
  };

  const applyDiscountCode = () => {
    axios
      .post("http://localhost:5000/api/discounts/apply", { code: discountCode })
      .then((res) => setDiscountAmount(res.data.discountAmount))
      .catch(() => alert("Invalid discount code"));
  };

  const handleOrder = async (paymentMethod) => {
    if (!selectedAddress) {
      alert("Please select an address.");
      return;
    }

    try {
      const orderData = {
        items: cartItems,
        paymentMethod,
        totalAmount: finalAmount,
        address: selectedAddress,
      };

      await axios.post("http://localhost:5000/api/orders", orderData, {
        headers: { Authorization: localStorage.getItem("token") },
      });

      dispatch(clearCart());
      navigate("/order-confirmation");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

      {/* Address Selection */}
      <AddressSelector setSelectedAddress={setSelectedAddress} />

      {/* Delivery Estimator */}
      <DeliveryEstimator />

      {/* Loyalty Points Section */}
      <div className="border p-4 rounded shadow mt-4">
        <h3 className="text-lg font-semibold">Loyalty Points</h3>
        <p>You have <strong>{loyaltyPoints} points</strong> (Max 20% discount)</p>
        <button 
          className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
          onClick={applyPoints}
        >
          Apply Points (₹{pointsDiscount} off)
        </button>
      </div>

      {/* Discount Code Section */}
      <div className="border p-4 rounded shadow mt-4">
        <h3 className="text-lg font-semibold">Discount Code</h3>
        <input 
          type="text" 
          className="border p-2 rounded w-full" 
          placeholder="Enter discount code"
          value={discountCode} 
          onChange={(e) => setDiscountCode(e.target.value)} 
        />
        <button 
          className="bg-green-500 text-white py-2 px-4 rounded mt-2"
          onClick={applyDiscountCode}
        >
          Apply Code
        </button>
      </div>

      {/* Order Summary */}
      <OrderSummary totalAmount={totalAmount} pointsDiscount={pointsDiscount} discountAmount={discountAmount} deliveryCharge={deliveryCharge} />

      {/* Payment Form */}
      <PaymentForm finalAmount={finalAmount} handleOrder={handleOrder} />
    </div>
  );
};

export default Checkout;
