import { useState } from "react";

const PaymentForm = ({ finalAmount, handleOrder }) => {
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [cardDetails, setCardDetails] = useState({ number: "", expiry: "", cvv: "" });

  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-lg font-semibold">Choose Payment Method</h3>

      <select className="w-full border p-2 mt-2" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
        <option value="upi">UPI</option>
        <option value="card">Credit/Debit Card</option>
        <option value="netbanking">Net Banking</option>
        <option value="cod">Cash on Delivery</option>
      </select>

      {/* UPI Payment */}
      {paymentMethod === "upi" && (
        <div className="mt-4">
          <h3 className="font-semibold">Enter UPI ID</h3>
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="example@upi"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
          />
        </div>
      )}

      {/* Card Payment */}
      {paymentMethod === "card" && (
        <div className="mt-4">
          <h3 className="font-semibold">Enter Card Details</h3>
          <input
            type="text"
            className="border p-2 w-full mb-2"
            placeholder="Card Number"
            maxLength="16"
            value={cardDetails.number}
            onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
          />
          <div className="flex gap-2">
            <input
              type="text"
              className="border p-2 w-full"
              placeholder="Expiry (MM/YY)"
              maxLength="5"
              value={cardDetails.expiry}
              onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
            />
            <input
              type="password"
              className="border p-2 w-full"
              placeholder="CVV"
              maxLength="3"
              value={cardDetails.cvv}
              onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
            />
          </div>
        </div>
      )}

      {/* Final Order Button */}
      <button
        onClick={() => handleOrder(paymentMethod)}
        className="bg-purple-600 text-white py-2 px-6 rounded mt-4 w-full"
      >
        Pay ₹{finalAmount.toFixed(2)}
      </button>
    </div>
  );
};

export default PaymentForm;
