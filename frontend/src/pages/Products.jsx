import { useState, useEffect } from "react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ category: "", price: "", brand: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/api/products", { params: filters })
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, [filters]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Shop by Category</h2>

      <div className="flex gap-4 mb-6">
        <select onChange={(e) => setFilters({ ...filters, category: e.target.value })} className="border p-2">
          <option value="">All Categories</option>
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>

        <select onChange={(e) => setFilters({ ...filters, price: e.target.value })} className="border p-2">
          <option value="">Sort by Price</option>
          <option value="low-high">Low to High</option>
          <option value="high-low">High to Low</option>
        </select>

        <select onChange={(e) => setFilters({ ...filters, brand: e.target.value })} className="border p-2">
          <option value="">All Brands</option>
          <option value="Nike">Nike</option>
          <option value="Adidas">Adidas</option>
          <option value="Puma">Puma</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <img src={product.image} alt={product.name} className="h-40 w-full object-cover rounded" />
            <h4 className="font-semibold">{product.name}</h4>
            <p>₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
