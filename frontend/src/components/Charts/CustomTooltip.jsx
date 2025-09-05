import React from 'react';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 rounded-lg border border-gray-300 shadow-md">
        {payload.map((item, index) => (
          <div key={index} className="mb-1">
            <p className="text-xs font-semibold text-purple-800">
              {item.name}
            </p>
            <p className="text-sm text-gray-600">
              Amount:{' '}
              <span className="text-sm font-medium text-gray-900">
                ₹{item.value.toLocaleString()}
              </span>
            </p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
 