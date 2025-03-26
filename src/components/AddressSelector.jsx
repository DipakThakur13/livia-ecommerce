const AddressSelector = ({ setSelectedAddress }) => {
    return (
      <div className="border p-4 rounded shadow mb-6">
        <h3 className="text-lg font-semibold">Select Delivery Address</h3>
        <select className="border p-2 w-full mt-2" onChange={(e) => setSelectedAddress(e.target.value)}>
          <option value="">Choose an Address</option>
          <option value="Home - 123 Street, Delhi">Home - 123 Street, Delhi</option>
          <option value="Office - 456 Tower, Mumbai">Office - 456 Tower, Mumbai</option>
        </select>
      </div>
    );
  };
  
  export default AddressSelector;
  