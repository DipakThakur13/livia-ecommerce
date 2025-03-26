import { useEffect, useState } from "react";
import axios from "axios";
import { FaUserCircle, FaCamera, FaTrash, FaPlus } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const [orders, setOrders] = useState([]);
  const [password, setPassword] = useState("");

  useEffect(() => {
    axios.get("/api/user/profile").then((res) => {
      setUser(res.data);
      setName(res.data.name);
      setMobile(res.data.mobile);
      setProfilePicture(res.data.profilePicture);
      setAddresses(res.data.addresses);
    });

    axios.get("/api/user/orders").then((res) => setOrders(res.data));
  }, []);

  const updateProfile = async () => {
    await axios.put("/api/user/profile", { name, mobile, profilePicture });
    alert("Profile updated!");
  };

  const updateAddresses = async () => {
    await axios.put("/api/user/profile/address", { addresses });
    alert("Addresses updated!");
  };

  const changePassword = async () => {
    await axios.put("/api/user/password", { password });
    alert("Password changed!");
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800">My Profile</h2>

      {/* Profile Picture */}
      <div className="relative w-24 h-24 mx-auto mt-4">
        <img src={profilePicture || "https://via.placeholder.com/150"} alt="Profile" className="w-full h-full rounded-full object-cover" />
        <label className="absolute bottom-0 right-0 bg-gray-700 text-white p-1 rounded-full cursor-pointer">
          <FaCamera />
          <input type="file" className="hidden" onChange={(e) => setProfilePicture(URL.createObjectURL(e.target.files[0]))} />
        </label>
      </div>

      {/* User Details */}
      <div className="mt-4">
        <label className="block font-medium">Name</label>
        <input type="text" className="border p-2 w-full rounded" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="mt-4">
        <label className="block font-medium">Mobile</label>
        <input type="text" className="border p-2 w-full rounded" value={mobile} onChange={(e) => setMobile(e.target.value)} />
      </div>

      <button onClick={updateProfile} className="mt-4 bg-purple-600 text-white py-2 px-4 rounded w-full">
        Update Profile
      </button>

      {/* Change Password */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold">Change Password</h3>
        <input type="password" className="border p-2 w-full mt-2 rounded" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={changePassword} className="mt-2 bg-blue-600 text-white py-2 px-4 rounded w-full">
          Change Password
        </button>
      </div>

      {/* Address Management */}
      <h3 className="text-xl font-semibold mt-6">Manage Addresses</h3>
      {addresses.map((addr, idx) => (
        <div key={idx} className="flex items-center border p-4 mt-2 rounded justify-between">
          <input type="text" className="border p-2 w-full rounded" value={addr} onChange={(e) => {
            const newAddresses = [...addresses];
            newAddresses[idx] = e.target.value;
            setAddresses(newAddresses);
          }} />
          <button className="ml-2 bg-red-500 text-white p-2 rounded" onClick={() => setAddresses(addresses.filter((_, i) => i !== idx))}>
            <FaTrash />
          </button>
        </div>
      ))}
      <div className="flex mt-2">
        <input type="text" className="border p-2 w-full rounded" placeholder="Add new address" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} />
        <button onClick={() => {
          if (newAddress) setAddresses([...addresses, newAddress]);
          setNewAddress("");
        }} className="ml-2 bg-green-500 text-white p-2 rounded">
          <FaPlus />
        </button>
      </div>
      <button onClick={updateAddresses} className="mt-4 bg-blue-600 text-white py-2 px-4 rounded w-full">
        Save Addresses
      </button>

      {/* Order History */}
      <h3 className="text-xl font-semibold mt-6">My Orders</h3>
      <div className="mt-2">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order._id} className="border p-4 rounded mb-2">
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total:</strong> ₹{order.totalAmount}</p>
            </div>
          ))
        ) : (
          <p>No orders yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
