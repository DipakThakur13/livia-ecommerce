import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [filters, setFilters] = useState({
    price: "",
    brand: "",
    size: "",
    rating: ""
  });

  useEffect(() => {
    axios.get(`/api/products/category/${category}`).then((res) => {
      setProducts(res.data);
      setFilteredProducts(res.data);
    });
  }, [category]);

  return (
    <div className="container mx-auto p-6">
      {/* Filters & Sorting */}
      <div className="flex flex-col md:flex-row justify-between mb-6">
        <div className="border p-4 rounded shadow-md md:w-1/4">
          <h3 className="text-lg font-semibold mb-2">Filters</h3>
          <label className="block mb-2">
            Price:
            <select className="w-full border p-2" onChange={(e) => setFilters({ ...filters, price: e.target.value })}>
              <option value="">All</option>
              <option value="500">Under ₹500</option>
              <option value="1000">Under ₹1000</option>
              <option value="2000">Under ₹2000</option>
            </select>
          </label>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Sort By:</h3>
          <select className="border p-2 w-full md:w-auto" onChange={(e) => setSortOption(e.target.value)}>
            <option value="">Recommended</option>
            <option value="low-to-high">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
