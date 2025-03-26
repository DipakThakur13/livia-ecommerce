import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import axios from "axios";
import Reviews from "../components/Reviews";
import ProductCarousel from "../components/ProductCarousel";
import ImageGallery from "../components/ImageGallery";
import SizeGuidePopup from "../components/SizeGuidePopup";
import DeliveryEstimator from "../components/DeliveryEstimator";
import { FaHeart, FaStar, FaTruck } from "react-icons/fa";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  useEffect(() => {
    axios.get(`/api/products/${id}`).then((res) => setProduct(res.data));
    axios.get(`/api/products/recommended/${id}`).then((res) => setRecommendedProducts(res.data));
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size.");
      return;
    }
    dispatch(addToCart({ ...product, size: selectedSize, quantity }));
    alert("Product added to cart!");
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Image Gallery with Zoom */}
        <ImageGallery images={product.images} />

        {/* Product Details */}
        <div>
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-gray-600 mt-2">{product.category}</p>

          {/* Ratings & Wishlist */}
          <div className="flex items-center mt-2">
            <p className="flex items-center text-yellow-500">
              <FaStar /> {product.rating}
            </p>
            <button className="ml-4 bg-gray-200 px-3 py-1 rounded flex items-center">
              <FaHeart className="mr-2" /> Wishlist
            </button>
          </div>

          {/* Pricing with Discounts */}
          <p className="text-lg font-semibold text-purple-700 mt-2">
            ₹{product.price} 
            <span className="text-gray-400 line-through ml-2">₹{product.originalPrice}</span> 
            <span className="text-green-500 ml-2">({product.discount}% Off)</span>
          </p>

          {/* Offers Section */}
          <div className="bg-blue-100 p-2 mt-3 rounded">
            <p className="text-sm text-blue-700">🔥 Get 10% instant discount on UPI Payments!</p>
            <p className="text-sm text-blue-700">💳 Extra 5% off with Livia Credit Card</p>
          </div>

          {/* Size Selection */}
          <div className="mt-4">
            <h3 className="font-semibold">Select Size: <span className="text-sm text-blue-500 cursor-pointer" onClick={() => setShowSizeGuide(true)}>Size Guide</span></h3>
            <div className="flex gap-2 mt-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`border px-4 py-2 rounded ${selectedSize === size ? "bg-purple-600 text-white" : "bg-gray-100"}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div className="mt-4">
            <h3 className="font-semibold">Quantity:</h3>
            <select className="border p-2" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
              {[1, 2, 3, 4, 5].map((q) => (
                <option key={q} value={q}>{q}</option>
              ))}
            </select>
          </div>

          {/* Delivery Estimation */}
          <DeliveryEstimator />

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="bg-purple-600 text-white py-2 px-6 rounded mt-4 w-full"
            disabled={product.stock === 0}
          >
            Add to Cart
          </button>

          <p className={product.stock > 0 ? "text-green-600 font-medium mt-2" : "text-red-600 font-medium mt-2"}>
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>
        </div>
      </div>

      {/* Reviews Section */}
      <Reviews productId={product._id} />

      {/* Recommended Products Carousel */}
      <h3 className="text-2xl font-semibold mt-8 mb-4">You may also like</h3>
      <ProductCarousel products={recommendedProducts} />

      {/* Size Guide Popup */}
      {showSizeGuide && <SizeGuidePopup onClose={() => setShowSizeGuide(false)} />}
    </div>
  );
};

export default ProductDetail;
