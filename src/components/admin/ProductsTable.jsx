import { useEffect, useState } from "react";
import axios from "axios";

const ProductsTable = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/admin/products").then((res) => setProducts(res.data));
  }, []);

  const deleteProduct = async (id) => {
    await axios.delete(`/api/admin/products/${id}`);
    setProducts(products.filter(product => product._id !== id));
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h3 className="text-xl font-semibold mb-4">Products</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Image</th>
            <th className="p-2">Name</th>
            <th className="p-2">Price</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id} className="border-b">
              <td className="p-2"><img src={product.image} alt={product.name} className="w-12 h-12" /></td>
              <td className="p-2">{product.name}</td>
              <td className="p-2">₹{product.price}</td>
              <td className="p-2">{product.stock}</td>
              <td className="p-2">
                <button onClick={() => deleteProduct(product._id)} className="bg-red-500 text-white p-2 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
