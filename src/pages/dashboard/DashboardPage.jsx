import React from 'react';
import { useEffect, useState } from 'react';        
import { FaBars, FaAngleRight, FaRegSmileBeam, FaChartLine, FaGift, FaUsers, FaBookOpen, FaCalendarAlt } from 'react-icons/fa';
import { GiCardPlay, GiBlackBook } from "react-icons/gi";
import { BookOpenIcon, RectangleStackIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline'; 
import { GiCrossedSwords, GiVintageRobot } from "react-icons/gi";
import UserProfileCard from "../../components/dashboard/UserProfileCard"; 
import StatCard from "../../components/dashboard/StatCard"; 
import DailyGoalCard from '../../components/dashboard/DailyGoalCard';
import GoalDialog from '../../components/dashboard/GoalDialog';
import SlidingSidebar from '../../components/common/SlidingSidebar';
import Banner from '../../components/common/Banner';
import SnackbarAlert from '../../components/common/SnackbarAlert';
import ChatWidget from '../../components/chat/ChatWidget';
import LoadingSpinner from '../../components/common/LoadingSpinner';

import useRoot from '../../hooks/common/useRoot';
import { useAuth } from '../../context/AuthContext';
import useGameStats from '../../hooks/dashboard/useGameStats';
import usePracticeStats from '../../hooks/dashboard/usePracticeStats';
import useNotification from '../../hooks/dashboard/useNotification';
import useMarkNotificationRead from '../../hooks/dashboard/useMarkNotificationRead';
import useStatsManipulation from '../../hooks/dashboard/useStatsManipulation';
import usePrimaryCharacterDetail from '../../hooks/game/usePrimaryCharacterDetail';


function DashboardPage() { 
  const MAX = 100; // for daily goal input limit
  const { username } = useAuth();
  const [userData, setUserData] = useState({
    level: 0,
    currentExp: 0, 
    expToLevelUp: 0,
    nextLevel: 1,
  })
   
  const [todayStatsData, setTodayStatsData] = useState([
      {
      id: 'flashcardPractice',
      icon: <RectangleStackIcon size={16}  className="text-amber-800 opacity-75 h-8 w-8" />,
      title: "Flashcard Practice",
      value: "0 Done",
      subtext: "Learn some new words today!",
      bgColor: "bg-gradient-to-br from-yellow-300 to-amber-400 text-amber-900",
      },
      {
      id: 'lessonPractice',
      icon: <BookOpenIcon size={16} className="text-emerald-800 opacity-75 h-8 w-8" />,
      title: "Lesson Practice",
      value: "0 Done",
      subtext: "Practice makes perfect!",
      bgColor: "bg-gradient-to-br from-green-300 to-emerald-400 text-emerald-900"
      },
      {
        id: 'scenarioPractice',
        icon: <ChatBubbleBottomCenterTextIcon size={16} className="text-sky-300 opacity-75 h-8 w-8" />,
        title: "Scenario Practice",
        value: "0 Done",
        subtext: "Make it real!",
        bgColor: "bg-slate-700 text-white",
      },
  ]);

  const [goalEmptyError, setGoalEmptyError] = useState(false)
  const [goalMaxError, setGoalMaxError] = useState(false)
  const [goalNegativeError, setGoalNegativeError] = useState(false)
  const [goalCreatedSuccess, setGoalCreatedSuccess] = useState(false)

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [goalDialogOpen, setGoalDialogOpen] = useState(false);
  const [goalInput, setGoalInput] = useState(0)
  const [imageUrl, setImageUrl] = useState('');

  const { errorMessage, setErrorMessage } = useRoot();
  const { isLoading, dailyGoal, setDailyGoal, currentLevel, currentExp } = useGameStats();
  const { notifications, setNotifications } = useNotification();
  const { readNotifications } = useMarkNotificationRead();
  const { flashcardDone, dialogueDone, lessonDone } = usePracticeStats();
  const { primaryCharacter } = usePrimaryCharacterDetail();
  const { createGoal, fetchStats } = useStatsManipulation();
  

  const userProgress = flashcardDone + lessonDone + dialogueDone; // From your usePracticeStats hook
  const userGoal = dailyGoal; // From your user profile data 
   
  const isGoalUnchanged = (dailyGoal && dailyGoal == goalInput) || goalInput < 0 || goalInput > MAX;

  useEffect(() => {
    if (!primaryCharacter.imageUrl) {
      setImageUrl(username.charAt(0).toUpperCase());
    }
    else {
      setImageUrl(primaryCharacter.imageUrl);
    }
  }, [primaryCharacter]);

  useEffect(() => {
    setGoalInput(dailyGoal);
    setUserData({
      level: currentLevel,
      currentExp: currentExp % 100,
      expToLevelUp: (currentLevel + 1) * 100 - currentExp,
      nextLevel: currentLevel + 1,
    });
  }, [dailyGoal, currentLevel, currentExp]);

  useEffect(() => {
    setTodayStatsData(prevStats => 
      prevStats.map(statItem => {
        switch (statItem.id) {
          case 'flashcardPractice':
            return { ...statItem, value: `${flashcardDone} Done` };
          case 'lessonPractice':
            return { ...statItem, value: `${lessonDone} Done` };
          case 'scenarioPractice':
            return { ...statItem, value: `${dialogueDone} Done` };
          default:
            return statItem;
        }
      })
    );
  }, [flashcardDone, dialogueDone, lessonDone]); 

  function handleSidebarToggle(){
    setSidebarOpen(!sidebarOpen);
  }

  function handleCloseGoalDialog(){
    setGoalInput(dailyGoal)
    setGoalDialogOpen(false);
  }

  function handleGoalChange(goalInput) {
    if (goalInput === "") {
      setGoalInput("");
      return;
    }
    let num = Number(goalInput);
    setGoalInput(num);
    if (num > MAX) {
      setGoalMaxError(true);
    }
    if (num < 0) {
      setGoalNegativeError(true);
    }
  }

  async function handleSaveGoal() {
    console.log("Saving goal:", goalInput);
    if (!goalInput.toString().trim()){
        setGoalEmptyError(true);
        return;
    }
    if (goalInput<0){
      setGoalNegativeError(true);
      return;
    }
    const newGoal = await createGoal(goalInput);
    if(!newGoal) 
      return;
    const result = await fetchStats();
    setDailyGoal(result.dailyGoal);
    setGoalDialogOpen(false);
    setGoalCreatedSuccess(true);
  }

  // Show loading spinner while game stats being fetched
   if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex"> 
      {/* Mobile Sidebar Component */}
      <SlidingSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setSidebarOpen(false)}
          style={{ pointerEvents: "auto" }}
        />
      )}

      {/* Main Content */}
      <div className="ml-0 sm:ml-64 flex-1 bg-slate-100 dark:bg-zinc-800 text-white min-h-screen py-8">
        {/* Dashboard Banner */}
        <Banner header="Dashboard" title="Dashboard" onOpen={sidebarOpen} handleSidebarToggle={handleSidebarToggle} />

        {/* Chat Component */}
        <ChatWidget avatar={imageUrl} currentLevel={currentLevel}/>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 px-4 sm:px-6">
          {/* Left Column: User Profile */}
          <div className="xl:col-span-3">
            <UserProfileCard username={username} {...userData} notifications={notifications} readNotifications={readNotifications}/>
          </div>

          {/* Right Column: Stats */}
          <div className="xl:col-span-2">
            <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-600 dark:text-zinc-200">
              <FaCalendarAlt className="mr-3 text-sky-400"/>
                Today's Stats
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {todayStatsData.map((stat) => (
                <StatCard
                  key={stat.id}
                  icon={stat.icon}
                  title={stat.title}
                  value={stat.value}
                  subtext={stat.subtext}
                  bgColor={stat.bgColor}
                  tag={stat.tag}
                />
              ))}
                <DailyGoalCard 
                    progress={userProgress} 
                    goal={userGoal} 
                    onEditClick={() => setGoalDialogOpen(true)} 
                />
            </div>
            
          </div>
        </div>
        <GoalDialog 
          open={goalDialogOpen} 
          onClose={handleCloseGoalDialog}
          goalInput={goalInput}
          onGoalInputChange={handleGoalChange}
          handleSaveGoal={handleSaveGoal}
          disabled={isGoalUnchanged}
        />

        {/* Goal Empty Alert */}
        <SnackbarAlert
          open={goalEmptyError}
          onClose={() => setGoalEmptyError(false)}
          severity="error"
          message="Please fill in a number."
        />

        {/* Goal Max Alert */}
        <SnackbarAlert
          open={goalMaxError}
          onClose={() => setGoalMaxError(false)}
          severity="error"
          message="Daily goal must be at most 100."
        />

        {/* Goal Negative Alert */}
        <SnackbarAlert
          open={goalNegativeError}
          onClose={() => setGoalNegativeError(false)}
          severity="error"
          message="Daily goal must be at least 0."
        />

         {/* Goal Created Success Alert */}
        <SnackbarAlert
          open={goalCreatedSuccess}
          onClose={() => setGoalCreatedSuccess(false)}
          severity="success"
          message="New goal created!"
        />

         {/* JWT Expired Alert */}
        <SnackbarAlert
          open={errorMessage}
          anchorOrigin = {{ vertical: "top", horizontal: "center" }}
          autoHideDuration={2000}
          onClose={() => setErrorMessage(false)}
          severity="error"
          message="Session expired, please log in again. Redirecting to login page..."
        />
      </div>
    </div>
  );
}

export default DashboardPage;