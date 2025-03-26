import { useEffect, useState } from "react";
import axios from "axios";
import FlashSaleTimer from "./FlashSaleTimer";

const FlashSales = () => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      const { data } = await axios.get("/api/flashsales");
      setSales(data);
    };
    fetchSales();
  }, []);

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">🔥 Flash Sales 🔥</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sales.map((sale) => (
          <div key={sale.id} className="bg-white p-4 rounded shadow">
            <img src={sale.Product.image} className="w-full h-40 object-cover" />
            <h3 className="text-lg font-semibold">{sale.Product.name}</h3>
            <p className="text-red-500">₹{sale.Product.price - sale.discount} <s className="text-gray-500">₹{sale.Product.price}</s></p>
            <FlashSaleTimer endTime={sale.endTime} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlashSales;
