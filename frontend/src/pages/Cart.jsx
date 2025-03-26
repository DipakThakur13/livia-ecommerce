import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "../redux/cartSlice";
import { addToWishlist } from "../redux/wishlistSlice";
import { useNavigate } from "react-router-dom";
import Coupons from "../components/Coupons";
import DeliveryEstimator from "../components/DeliveryEstimator";
import { FaTrash, FaHeart } from "react-icons/fa";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total price
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = totalAmount * 0.1; // 10% off
  const deliveryCharge = totalAmount >= 500 ? 0 : 50;
  const finalAmount = totalAmount - discount + deliveryCharge;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty. Start shopping now!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Cart Items */}
          <div className="md:col-span-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between border p-4 rounded shadow mb-4">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-gray-500">{item.size}</p>
                  <p className="text-purple-700 font-semibold">₹{item.price}</p>

                  {/* Quantity Selector */}
                  <select
                    value={item.quantity}
                    className="border p-2 mt-2"
                    onChange={(e) => dispatch(updateQuantity({ id: item.id, quantity: Number(e.target.value) }))}
                  >
                    {[1, 2, 3, 4, 5].map((q) => (
                      <option key={q} value={q}>{q}</option>
                    ))}
                  </select>
                </div>

                {/* Remove & Wishlist Buttons */}
                <div className="flex gap-3">
                  <button onClick={() => dispatch(addToWishlist(item))} className="text-red-500">
                    <FaHeart size={20} />
                  </button>
                  <button onClick={() => dispatch(removeFromCart(item.id))} className="text-gray-500">
                    <FaTrash size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="border p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
            <div className="flex justify-between">
              <p>Total Amount:</p>
              <p>₹{totalAmount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Discount:</p>
              <p className="text-green-500">-₹{discount.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
              <p>Delivery Charges:</p>
              <p>{deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}</p>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-semibold">
              <p>Final Payable Amount:</p>
              <p>₹{finalAmount.toFixed(2)}</p>
            </div>

            {/* Coupons */}
            <Coupons />

            {/* Delivery Estimator */}
            <DeliveryEstimator />

            {/* Checkout Button */}
            <button
              onClick={() => navigate("/checkout")}
              className="bg-purple-600 text-white py-2 px-6 rounded mt-4 w-full"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
