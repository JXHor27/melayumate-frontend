import React from 'react';
import { useEffect, useState } from 'react';        
import { FaBars, FaAngleRight, FaRegSmileBeam, FaChartLine, FaGift, FaUsers, FaBookOpen, FaCalendarAlt } from 'react-icons/fa';
import { GiCardPlay, GiBlackBook } from "react-icons/gi";

import UserProfileCard from "../../components/dashboard/UserProfileCard"; 
import StatCard from "../../components/dashboard/StatCard"; 
import DailyGoalCard from '../../components/dashboard/DailyGoalCard';
import GoalDialog from '../../components/dashboard/GoalDialog';
import SlidingSidebar from '../../components/common/SlidingSidebar';
import Banner from '../../components/common/Banner';
import SnackbarAlert from '../../components/common/SnackbarAlert';
import ChatWidget from '../../components/chat/ChatWidget';

import useRoot from '../../hooks/common/useRoot';
import useStats from '../../hooks/dashboard/useStats';
import useDailyStat from '../../hooks/dashboard/useDailyStat';
import useNotification from '../../hooks/dashboard/useNotification';
import useMarkNotificationRead from '../../hooks/dashboard/useMarkNotificationRead';
import useDailyGoalManipulation from '../../hooks/dashboard/useDailyGoalManipulation';
const levelData = [
  {
    level: 1,
    thresholdExp: 100
  },{
    level: 2,
    thresholdExp: 200
  }, {
    level: 3,
    thresholdExp: 300
  }
]

function DashboardPage() {
   const [userData, setUserData] = useState({
    level: 0,
    currentExp: 0, 
    expToLevelUp: 0,
    nextLevel: 1,
  })
   
    // // Fetch user name based on userId//
    // useEffect(() => {
    //   async function fetchUsername() {
    //     const userId = localStorage.getItem("userId");
    //     const response = await fetch(`http://localhost:8080/user/${userId}`);
    //     if (!response.ok) {
    //       const message = `An error occurred: ${response.statusText}`;
    //       console.error(message);
    //       return;
    //     }
    //     const user = await response.json();
    //     console.log(user);
  

    //     // Update the user name based on fetched data
    //     setUserData(prevStats => {
    //         return {
    //           ...prevStats, // Keep existing properties
    //           username: user.username
    //           };
    //       });
    //   }
    //   fetchUsername();
    // }, []);




    // // Fetch user stat AND EXP//
    // useEffect(() => {
    //   async function fetchTodayStats() {
    //     const userId = localStorage.getItem("userId");
    //     const response = await fetch(`http://localhost:8080/user/today/stat/${userId}`);
    //     if (!response.ok) {
    //       const message = `An error occurred: ${response.statusText}`;
    //       console.error(message);
    //       return;
    //     }
    //     const stats = await response.json();
    //     console.log(stats);
    
    //       // Update the today stat based on fetched data
    //     setTodayStatsData(prevStats => {
    //       return prevStats.map(statItem => {
    //         if (statItem.id === 'flashcardPractice') {
    //           return {
    //           ...statItem, // Keep existing properties
    //           value: `${stats.flashcardDone || 0} Done` // Update only the value
    //           };
    //         }
    //         if (statItem.id === 'lessonPractice') {
    //           return {
    //             ...statItem, // Keep existing properties
    //             value: `${stats.lessonDone || 0} Done` // Update only the value
    //           };
    //         }
    //         if (statItem.id === 'scenarioPractice') {
    //           return {
    //             ...statItem, // Keep existing properties
    //             value: `${stats.scenarioDone || 0} Done` // Update only the value
    //           };
    //         }
    //         return statItem; // Return unchanged for other items
    //       });
    //     });

    //       // Update the user EXP based on fetched data
    //     setUserData(prevStats => {
    //         return {
    //           ...prevStats, // Keep existing properties
    //           currentExp: stats.currentEXP,
    //           expToLevelUp: 100-stats.currentEXP// Update only the value
    //           };
    //       });
    //   }
    //   fetchTodayStats();
    // }, []);

  const [todayStatsData, setTodayStatsData] = useState([
      {
      id: 'flashcardPractice',
      icon: <GiCardPlay size={36}  className="text-amber-800 opacity-75" />,
      title: "Flashcard Practice",
      value: "0 Done",
      subtext: "Practice makes perfect!",
      bgColor: "bg-gradient-to-br from-yellow-300 to-amber-400 text-amber-900",
      },
      {
      id: 'lessonPractice',
      icon: <GiBlackBook size={36} className="text-emerald-800 opacity-75" />,
      title: "Lesson Practice",
      value: "0 Done",
      subtext: "Learn some new words today!",
      bgColor: "bg-gradient-to-br from-green-300 to-emerald-400 text-emerald-900"
      },
      {
        id: 'scenarioPractice',
        icon: <FaUsers size={36} className="text-sky-300 opacity-75" />,
        title: "Scenario Practice",
        value: "0 Done",
        subtext: "Make it real!",
        bgColor: "bg-slate-700 text-white",
      },
  ]);

  const [goalEmptyError, setGoalEmptyError] = useState(false)
  const [goalNegativeError, setGoalNegativeError] = useState(false)
  const [goalCreatedSuccess, setGoalCreatedSuccess] = useState(false)

  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [goalDialogOpen, setGoalDialogOpen] = useState(false);
  const [goalInput, setGoalInput] = useState(0)

  const { errorMessage, setErrorMessage, username } = useRoot();
  const { dailyGoal, setDailyGoal, currentLevel } = useStats();
  const { notifications, setNotifications } = useNotification();
  const { readNotifications } = useMarkNotificationRead();
  const { flashcardDone, dialogueDone, lessonDone } = useDailyStat();
  
  const { createGoal, fetchGoal } = useDailyGoalManipulation({ setDailyGoal });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const userProgress = flashcardDone + lessonDone + dialogueDone; // From your useDailyStat hook
  const userGoal = dailyGoal; // From your user profile data 
   
  const isGoalUnchanged = dailyGoal && dailyGoal == goalInput 

  useEffect(() => {
      setGoalInput(dailyGoal)
    }, [dailyGoal]);

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

  async function handleSaveGoal() {
    if (!goalInput.trim()){
        setGoalEmptyError(true);
        return;
    }
    if (goalInput<0){
      setGoalNegativeError(true);
      return;
    }
    const newGoal = await createGoal(goalInput);
    if(!newGoal) return;
    await fetchGoal();
    setGoalDialogOpen(false);
    setGoalCreatedSuccess(true);
  }



  return (
    <div className="flex"> 
      {/* Mobile Sidebar Component */}
      <SlidingSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="ml-0 sm:ml-64  flex-1 bg-slate-100 dark:bg-zinc-800 text-white min-h-screen py-8">
        {/* Dashboard Banner */}
        <Banner header="Dashboard" title="Dashboard" onOpen={sidebarOpen} handleSidebarToggle={handleSidebarToggle} />

        {/* Chat Component */}
        <ChatWidget avatar="https://i.pravatar.cc/40?u=jamesz" currentLevel={currentLevel}/>
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8 px-4 sm:px-6">
          {/* Left Column: User Profile */}
          <div className="xl:col-span-3">
            <UserProfileCard username={username} {...userData} notifications={notifications} readNotifications={readNotifications}/>
          </div>

          {/* Right Column: Stats */}
          <div className="xl:col-span-2">
            <h2 className="text-2xl font-semibold mb-6 flex items-center text-zinc-200">
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
          onGoalInputChange={setGoalInput}
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