import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded shadow-md p-4 relative hover:shadow-lg transition">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
        <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
        <p className="text-gray-600">₹{product.price}</p>
      </Link>

      {/* Wishlist & Cart Icons */}
      <div className="absolute top-2 right-2 flex space-x-2">
        <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
          <FaHeart size={18} />
        </button>
        <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition">
          <FaShoppingCart size={18} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
