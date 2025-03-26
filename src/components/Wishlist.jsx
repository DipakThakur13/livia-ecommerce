import { useSelector } from "react-redux";

const Wishlist = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Wishlist</h3>
      {wishlistItems.length === 0 ? (
        <p>No items in wishlist.</p>
      ) : (
        <ul>
          {wishlistItems.map((item) => (
            <li key={item._id} className="border p-4 rounded shadow mb-2">
              <img src={item.image} alt={item.name} className="w-16 h-16 inline-block mr-4" />
              <span>{item.name} - ₹{item.price}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
