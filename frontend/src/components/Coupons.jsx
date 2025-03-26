import { useState } from "react";

const Coupons = () => {
  const [coupon, setCoupon] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);

  const applyCoupon = () => {
    if (coupon === "LIVIA10") {
      setDiscountApplied(true);
      alert("Coupon applied successfully! 10% discount added.");
    } else {
      alert("Invalid coupon code.");
    }
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold">Apply Coupon</h3>
      <div className="flex gap-2 mt-2">
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Enter Coupon Code"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        />
        <button onClick={applyCoupon} className="bg-green-500 text-white px-4 py-2 rounded">
          Apply
        </button>
      </div>
      {discountApplied && <p className="text-green-500 mt-2">Discount Applied 🎉</p>}
    </div>
  );
};

export default Coupons;
