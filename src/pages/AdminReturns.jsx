import { useEffect, useState } from "react";
import axios from "axios";

const AdminReturns = () => {
  const [returns, setReturns] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/returns").then((res) => setReturns(res.data));
  }, []);

  const handleStatusUpdate = async (returnId, status) => {
    await axios.put(`http://localhost:5000/api/returns/${returnId}`, { status });
    setReturns((prev) => prev.map((r) => (r._id === returnId ? { ...r, status } : r)));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Manage Return Requests</h2>
      {returns.map((returnItem) => (
        <div key={returnItem._id} className="border p-4 mt-2 rounded">
          <p><strong>Order:</strong> {returnItem.orderId._id}</p>
          <p><strong>Reason:</strong> {returnItem.reason}</p>
          <p><strong>Option:</strong> {returnItem.returnOption}</p>
          <p><strong>Status:</strong> {returnItem.status}</p>
          <select className="border p-2 mt-2" onChange={(e) => handleStatusUpdate(returnItem._id, e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default AdminReturns;
