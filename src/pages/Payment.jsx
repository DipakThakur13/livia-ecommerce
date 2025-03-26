import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });
  const [walletBalance, setWalletBalance] = useState(500);
  const [savedCards, setSavedCards] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const deliveryCharge = totalAmount >= 500 ? 0 : 50;
  const finalAmount = totalAmount + deliveryCharge;

  useEffect(() => {
    // Fetch saved cards for logged-in users
    const fetchSavedCards = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user/saved-cards");
        setSavedCards(res.data);
      } catch (error) {
        console.error("Error fetching saved cards:", error);
      }
    };
    fetchSavedCards();
  }, []);

  const handleOrder = async () => {
    if (paymentMethod === "upi" && upiId === "") {
      alert("Please enter your UPI ID.");
      return;
    }
    if (paymentMethod === "card" && (cardDetails.number.length < 16 || cardDetails.cvv.length < 3)) {
      alert("Please enter valid card details.");
      return;
    }
    if (paymentMethod === "wallet" && walletBalance < finalAmount) {
      alert("Insufficient wallet balance.");
      return;
    }

    try {
      const orderData = {
        items: cartItems,
        paymentMethod,
        amount: finalAmount,
      };
      await axios.post("http://localhost:5000/api/orders", orderData);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/order-confirmation");
      }, 2000);
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Choose Payment Method</h2>

      {/* Payment Options */}
      <div className="border p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Select Payment Method</h3>
        <select className="w-full border p-2" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="upi">UPI</option>
          <option value="card">Credit/Debit Card</option>
          <option value="wallet">Wallet (Balance: ₹{walletBalance})</option>
          <option value="emi">EMI</option>
          <option value="cod">Cash on Delivery</option>
        </select>
      </div>

      {/* UPI Payment */}
      {paymentMethod === "upi" && (
        <div className="mt-4 border p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Enter UPI ID</h3>
          <input type="text" className="border p-2 w-full" placeholder="example@upi" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
        </div>
      )}

      {/* Card Payment */}
      {paymentMethod === "card" && (
        <div className="mt-4 border p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Enter Card Details</h3>
          <input type="text" className="border p-2 w-full mb-2" placeholder="Card Number" maxLength="16" value={cardDetails.number} onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })} />
          <div className="flex gap-2">
            <input type="text" className="border p-2 w-full" placeholder="Expiry (MM/YY)" maxLength="5" value={cardDetails.expiry} onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })} />
            <input type="password" className="border p-2 w-full" placeholder="CVV" maxLength="3" value={cardDetails.cvv} onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} />
          </div>

          {/* Saved Cards Option */}
          {savedCards.length > 0 && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Use Saved Card</h3>
              {savedCards.map((card, index) => (
                <button key={index} className="border px-4 py-2 rounded mr-2 mt-2" onClick={() => setCardDetails(card)}>
                  **** **** **** {card.number.slice(-4)}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* EMI Payment */}
      {paymentMethod === "emi" && (
        <div className="mt-4 border p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Choose EMI Plan</h3>
          <select className="w-full border p-2">
            <option>3 Months (₹{(finalAmount / 3).toFixed(2)} per month)</option>
            <option>6 Months (₹{(finalAmount / 6).toFixed(2)} per month)</option>
            <option>12 Months (₹{(finalAmount / 12).toFixed(2)} per month)</option>
          </select>
        </div>
      )}

      {/* Order Summary */}
      <div className="mt-6 border p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
        <div className="flex justify-between">
          <p>Total Amount:</p>
          <p>₹{totalAmount.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p>Delivery Charges:</p>
          <p>{deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}</p>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-semibold">
          <p>Final Payable Amount:</p>
          <p>₹{finalAmount.toFixed(2)}</p>
        </div>
      </div>

      {/* Place Order Button */}
      <button onClick={handleOrder} className="bg-purple-600 text-white py-2 px-6 rounded mt-4 w-full">
        Place Order
      </button>

      {/* Payment Confirmation Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h3 className="text-lg font-semibold mb-4">Payment Successful!</h3>
            <p>Your order has been placed.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
