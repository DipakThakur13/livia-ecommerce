const ProfileSidebar = ({ setActiveTab }) => {
    return (
      <div className="col-span-3 border p-4 rounded shadow bg-white">
        <h3 className="text-lg font-semibold mb-4">My Account</h3>
        <button onClick={() => setActiveTab("orders")} className="block py-2">My Orders</button>
        <button onClick={() => setActiveTab("addresses")} className="block py-2">Saved Addresses</button>
        <button onClick={() => setActiveTab("wishlist")} className="block py-2">Wishlist</button>
      </div>
    );
  };
  
  export default ProfileSidebar;
  