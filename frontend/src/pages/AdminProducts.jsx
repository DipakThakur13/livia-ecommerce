import { useEffect, useState } from "react";
import axios from "axios";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: "", price: "", stock: "", image: "" });

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addProduct = async () => {
    try {
      await axios.post("http://localhost:5000/api/products", newProduct, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      alert("Product added successfully!");
      window.location.reload();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>

      <div className="mb-6 border p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Add Product</h3>
        <input type="text" placeholder="Name" className="w-full border p-2 mb-2"
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
        <input type="number" placeholder="Price" className="w-full border p-2 mb-2"
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
        <input type="number" placeholder="Stock" className="w-full border p-2 mb-2"
          onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })} />
        <input type="text" placeholder="Image URL" className="w-full border p-2 mb-2"
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })} />
        <button onClick={addProduct} className="w-full bg-purple-600 text-white py-2 rounded">
          Add Product
        </button>
      </div>

      <h3 className="text-lg font-semibold mb-2">Existing Products</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <img src={product.image} alt={product.name} className="h-32 w-full object-cover rounded" />
            <h4 className="font-semibold">{product.name}</h4>
            <p>₹{product.price}</p>
            <button className="bg-red-500 text-white py-1 px-2 mt-2 rounded"
              onClick={async () => {
                await axios.delete(`http://localhost:5000/api/products/${product.id}`, {
                  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
                });
                alert("Product deleted!");
                window.location.reload();
              }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
