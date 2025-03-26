import { useEffect, useState } from "react";
import axios from "axios";

const RecommendedProducts = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const { data } = await axios.get(`/api/recommendations/${userId}`);
      setRecommendations(data);
    };

    fetchRecommendations();
  }, [userId]);

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">💡 Recommended for You</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recommendations.map((rec) => (
          <div key={rec.productId} className="bg-white p-4 rounded shadow">
            <img src={rec.Product.image} className="w-full h-40 object-cover" />
            <h3 className="text-lg font-semibold">{rec.Product.name}</h3>
            <p className="text-purple-600">₹{rec.Product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;
