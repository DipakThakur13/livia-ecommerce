import { useEffect, useState } from "react";
import axios from "axios";

const Loyalty = ({ userId }) => {
  const [points, setPoints] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/loyalty/${userId}`);
      setPoints(data.points);
    };

    fetchData();
  }, [userId]);

  const redeemPoints = async () => {
    const { data } = await axios.post(`/api/loyalty/${userId}/redeem`, { pointsToRedeem: 10 });
    setDiscount(data.discountAmount);
  };

  return (
    <div className="p-4 bg-purple-100 text-purple-800 rounded-lg">
      <h3 className="text-lg font-semibold">Loyalty Rewards</h3>
      <p>You have <strong>{points} points</strong>.</p>
      {discount > 0 ? (
        <p className="text-green-600">🎉 ₹{discount} discount applied!</p>
      ) : (
        <button onClick={redeemPoints} className="bg-purple-600 text-white px-4 py-2 mt-2 rounded">
          Redeem 10 Points
        </button>
      )}
    </div>
  );
};

export default Loyalty;
