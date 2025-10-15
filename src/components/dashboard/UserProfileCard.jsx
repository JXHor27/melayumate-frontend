import React from 'react';
import { FaStar, FaAngleDoubleRight } from 'react-icons/fa';
import NotificationBell from '../notification/NotificationBell';
function UserProfileCard({username, level, currentExp, expToLevelUp, nextLevel, notifications, readNotifications}) {

  //const progressPercentage = expToLevelUp > 0 ? Math.min((currentExp / expToLevelUp) * 100, 100) : 0;
  const progressPercentage = expToLevelUp > 0 ? Math.min((currentExp / 100) * 100, 100) : 0;
  // change 100 to next level exp requirement, such as lvl1 100exp, lvl 2 200exp, etc
  return (
    <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-xl p-3 sm:p-6 shadow-2xl w-full">
      {/* Top Section: Welcome, Level, Icon */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-sm text-purple-200">Welcome</p>
          <h2 className="text-3xl font-bold">{username}</h2>
          <span className="mt-2 inline-flex items-center bg-purple-800 text-sm px-4 py-1 rounded-full font-semibold shadow">
            <FaStar className="mr-2 text-yellow-400" /> Level {level}
          </span>
        </div>

        {/* Notification Component */}
        <NotificationBell parentNotifications={notifications} readNotifications={readNotifications}/>
        {/* <FaGamepad size={48} className="text-purple-300 opacity-80" /> */}
      </div>

      {/* EXP Progress Section */}
      <div className="mb-6">
        <p className="text-center text-purple-100 mb-2 font-medium">
          Earn <span className="font-bold text-white">{expToLevelUp} EXP</span> to level up!
        </p>
        <div className="h-3 bg-purple-900/70 rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-white transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-purple-300 mt-1">
          <span>Progress to next level</span>
          <span>{progressPercentage.toFixed(0)}%</span>
        </div>
      </div>

      {/* To Next Level Section */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-md font-semibold text-purple-100">Next Level </h3>
          <button className="flex items-center bg-purple-800/80 hover:bg-purple-800 text-xs px-3 py-1.5 rounded-md font-semibold shadow transition-colors">
            <FaAngleDoubleRight className="mr-1.5" /> Level {nextLevel}
          </button>
          {/* <button className="text-xs text-purple-300 hover:text-white flex items-center"><FaInfoCircle className="mr-1"/> Levels Info</button> */}
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;