import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const ReturnRequest = ({ orderId }) => {
  const user = useSelector((state) => state.auth.user);
  const [reason, setReason] = useState("");
  const [returnOption, setReturnOption] = useState("Refund");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/returns", {
        orderId,
        userId: user._id,
        reason,
        returnOption,
      });
      setMessage(res.data.message);
    } catch (error) {
      setMessage("Failed to submit return request.");
    }
  };

  return (
    <div className="p-6 border rounded shadow">
      <h2 className="text-2xl font-semibold">Request a Return</h2>
      <select className="w-full border p-2 mt-4" value={returnOption} onChange={(e) => setReturnOption(e.target.value)}>
        <option value="Refund">Refund</option>
        <option value="Replacement">Replacement</option>
      </select>
      <textarea className="w-full border p-2 mt-4" placeholder="Reason for return" value={reason} onChange={(e) => setReason(e.target.value)} />
      <button onClick={handleSubmit} className="bg-purple-600 text-white px-4 py-2 rounded mt-4">Submit</button>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
};

export default ReturnRequest;
