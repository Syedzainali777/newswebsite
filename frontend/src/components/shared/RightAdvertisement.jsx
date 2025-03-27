import React from "react";

const RightAdvertise = () => {
  return (
    <aside className="w-full p-4 space-y-4">
      {/* Example Ad 1 */}
      <div className="bg-gray-100 rounded-lg overflow-hidden">
        <div className="bg-blue-200 h-40 flex items-center justify-center">
          <span className="text-sm font-semibold text-blue-600">
            Ad Space 1
          </span>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Your Ad Here</h3>
          <p className="text-sm text-gray-600">
            Promote your product or service.
          </p>
          <button className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Learn More
          </button>
        </div>
      </div>

      {/* Example Ad 2 */}
      <div className="bg-gray-100 rounded-lg overflow-hidden">
        <div className="bg-green-200 h-40 flex items-center justify-center">
          <span className="text-sm font-semibold text-green-600">
            Ad Space 2
          </span>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">Another Ad</h3>
          <p className="text-sm text-gray-600">Reach your target audience.</p>
          <button className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Shop Now
          </button>
        </div>
      </div>

      {/* Example Ad 3 (Square Ad) */}
      <div className="bg-gray-100 rounded-lg overflow-hidden">
        <div className="bg-yellow-200 w-full h-40 flex items-center justify-center">
          <span className="text-sm font-semibold text-yellow-600">
            Square Ad
          </span>
        </div>
      </div>

      {/* Add more ads as needed */}
    </aside>
  );
};

export default RightAdvertise;
