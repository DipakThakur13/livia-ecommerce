const DeliveryEstimator = () => {
    const estimatedDate = new Date();
    estimatedDate.setDate(estimatedDate.getDate() + 3);
  
    return (
      <div className="border p-4 rounded shadow">
        <h3 className="text-lg font-semibold">Estimated Delivery</h3>
        <p className="text-green-600">Expected by: {estimatedDate.toDateString()}</p>
      </div>
    );
  };
  
  export default DeliveryEstimator;
  