import React from 'react';

const HealthBar = ({ current, max }) => {
  const percentage = (current / max) * 100;
  let barColor = 'bg-green-500';

  if (percentage < 50) barColor = 'bg-yellow-500';
  if (percentage < 25) barColor = 'bg-red-500';

  return (
    <div className="w-full bg-gray-700 rounded-full h-5 border-2 border-gray-900">
      <div
        className={`${barColor} h-full rounded-full transition-all duration-500 ease-linear`}
        style={{ width: `${percentage}%` }}
      ></div>
      <span className="absolute inset-0 text-white font-bold text-sm flex items-center justify-center">
        {current} / {max}
      </span>
    </div>
  );
};

export default HealthBar;