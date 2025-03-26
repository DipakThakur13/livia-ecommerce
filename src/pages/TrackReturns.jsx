import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const TrackReturns = () => {
  const user = useSelector((state) => state.auth.user);
  const [returns, setReturns] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/returns/${user._id}`).then((res) => setReturns(res.data));
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Return Requests</h2>
      <ul>
        {returns.map((returnItem) => (
          <li key={returnItem._id} className="border p-4 mt-2 rounded">
            <p><strong>Order:</strong> {returnItem.orderId._id}</p>
            <p><strong>Reason:</strong> {returnItem.reason}</p>
            <p><strong>Option:</strong> {returnItem.returnOption}</p>
            <p><strong>Status:</strong> {returnItem.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackReturns;
