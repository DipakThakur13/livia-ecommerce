import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [recommended, setRecommended] = useState([]);
  const [discount, setDiscount] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");

        // Fetch recommended products
        const { data: recommendedProducts } = await axios.get(`/api/recommendations/${userId}`);
        setRecommended(recommendedProducts);

        // Fetch discount
        const { data: discountData } = await axios.post(`/api/discounts/${userId}/generate-discount`);
        setDiscount(discountData.code);
      } catch (err) {
        console.error("Error fetching data", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Recommended for You</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recommended.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {discount && (
        <div className="mt-6 p-4 bg-purple-100 text-purple-800">
          🎉 Special Offer! Use Code: <strong>{discount}</strong> for 10% Off!
        </div>
      )}
    </div>
  );
};

export default Home;
