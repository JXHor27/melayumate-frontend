import React from 'react';

function ScenarioCard({ title, description, onClick }){
  return (
    <div
      onClick={onClick}
      className="border-b-2 border-amber-300 flex justify-between items-center bg-gradient-to-r from-zinc-700 to-zinc-500  p-5 rounded-xl cursor-pointer "
    >
      {/* Text Content */}
      <div className="">
        <h2 className="text-2xl font-semibold text-white mb-2">{title}</h2>
        <p className="text-base text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default ScenarioCard;