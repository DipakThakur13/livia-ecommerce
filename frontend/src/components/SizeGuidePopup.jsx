const SizeGuidePopup = ({ onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded shadow-lg">
          <h2 className="text-xl font-bold">Size Guide</h2>
          <p>Use this guide to find your perfect fit!</p>
          <table className="w-full border mt-3">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Size</th>
                <th className="p-2">Chest (in)</th>
                <th className="p-2">Waist (in)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="p-2">S</td><td className="p-2">36</td><td className="p-2">30</td></tr>
              <tr><td className="p-2">M</td><td className="p-2">38</td><td className="p-2">32</td></tr>
              <tr><td className="p-2">L</td><td className="p-2">40</td><td className="p-2">34</td></tr>
            </tbody>
          </table>
          <button onClick={onClose} className="mt-4 bg-purple-600 text-white py-2 px-4 rounded">Close</button>
        </div>
      </div>
    );
  };
  
  export default SizeGuidePopup;
  