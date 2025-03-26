import { useState, useEffect } from "react";
import axios from "axios";

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/reviews/${productId}`)
      .then(res => setReviews(res.data))
      .catch(err => console.error(err));
  }, [productId]);

  const submitReview = () => {
    axios.post(`http://localhost:5000/api/reviews/${productId}`, newReview, {
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => {
        setReviews([...reviews, res.data]);
        setNewReview({ rating: 5, comment: "" });
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold">Customer Reviews</h3>
      
      {reviews.length > 0 ? (
        reviews.map((r, index) => (
          <div key={index} className="border p-3 rounded my-2">
            <p><strong>{r.user?.name || "Anonymous"}</strong> ⭐ {r.rating}/5</p>
            <p>{r.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews yet. Be the first to review!</p>
      )}

      <div className="mt-4">
        <h4 className="text-md font-semibold">Write a Review</h4>
        <select 
          value={newReview.rating} 
          onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
          className="border p-2 rounded"
        >
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>
        
        <textarea 
          placeholder="Write a review..." 
          className="border p-2 w-full rounded my-2"
          value={newReview.comment} 
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
        ></textarea>
        
        <button 
          onClick={submitReview} 
          className="bg-purple-600 text-white py-2 px-4 rounded mt-2"
        >
          Submit Review
        </button>
      </div>
    </div>
  );
};

export default Reviews;
