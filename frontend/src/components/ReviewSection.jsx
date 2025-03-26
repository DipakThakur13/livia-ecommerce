import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";

const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    axios.get(`/api/reviews/${productId}`).then((res) => setReviews(res.data));
  }, [productId]);

  const submitReview = async () => {
    if (!newReview.trim()) return;
    const reviewData = { productId, review: newReview, rating };
    await axios.post("/api/reviews", reviewData);
    setNewReview("");
    setReviews([...reviews, reviewData]);
  };

  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold">Reviews</h3>
      
      {/* Existing Reviews */}
      <div className="mt-4">
        {reviews.map((r, index) => (
          <div key={index} className="border p-4 rounded mb-2">
            <p className="font-semibold">{r.review}</p>
            <div className="flex items-center text-yellow-500">
              {Array(r.rating).fill(<FaStar />)}
            </div>
          </div>
        ))}
      </div>

      {/* Add New Review */}
      <div className="mt-4">
        <h4 className="font-semibold">Write a Review</h4>
        <textarea
          className="border p-2 w-full mt-2"
          placeholder="Share your thoughts..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        />
        <div className="mt-2 flex items-center">
          <p>Rating:</p>
          <select
            className="border ml-2 p-2"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>{r} Stars</option>
            ))}
          </select>
        </div>
        <button onClick={submitReview} className="bg-purple-600 text-white px-4 py-2 mt-4 rounded">
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default ReviewSection;
