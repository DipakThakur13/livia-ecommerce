const OrderSummary = ({ totalAmount, pointsDiscount, discountAmount, deliveryCharge }) => {
    const finalAmount = totalAmount - pointsDiscount - discountAmount + deliveryCharge;
  
    return (
      <div className="border p-4 rounded shadow mt-4">
        <h3 className="text-lg font-semibold">Final Amount</h3>
        <p>Original: ₹{totalAmount}</p>
        <p>Discount from Points: -₹{pointsDiscount}</p>
        <p>Discount Code: -₹{discountAmount}</p>
        <p>Delivery Charge: {deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}</p>
        <p className="font-bold text-xl">Total Payable: ₹{finalAmount.toFixed(2)}</p>
      </div>
    );
  };
  
  export default OrderSummary;
  