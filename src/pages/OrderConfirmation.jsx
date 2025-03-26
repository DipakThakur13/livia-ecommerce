import { Link } from "react-router-dom";

const OrderConfirmation = () => {
  return (
    <div className="container mx-auto text-center p-10">
      <h2 className="text-3xl font-bold text-green-600">🎉 Order Placed Successfully!</h2>
      <p className="text-gray-600 mt-4">Thank you for shopping with us. Your order is being processed.</p>
      <Link to="/" className="bg-purple-600 text-white py-2 px-6 rounded mt-4 inline-block">
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderConfirmation;
