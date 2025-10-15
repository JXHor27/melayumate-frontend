import React from 'react';

function StatCard({ icon, title, value, subtext, bgColor, tag }) {
  return (
    <div className={`h-20 rounded-xl p-4 shadow-lg relative flex flex-col justify-between min-h-[160px] ${bgColor}`}>
      {tag && (
        <div className={`absolute top-2 right-2 text-xs px-2 py-0.5 rounded-md shadow ${tag.color}`}>
          {tag.text}
        </div>
      )}
      <div className="flex-shrink-0 mb-2">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold my-1">{value}</p>
        {subtext && <p className="text-xs opacity-100">{subtext}</p>}
      </div>
    </div>
  );
};

export default StatCard;