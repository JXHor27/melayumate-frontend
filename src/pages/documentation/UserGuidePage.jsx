import React, { useState, useEffect } from 'react';
import Banner from '../../components/common/Banner';
import SlidingSidebar from '../../components/common/SlidingSidebar';
import AccordionItem from '../../components/documentation/AccordionItem';
// Import icons for each section
import { 
  HomeIcon, UserIcon, BookOpenIcon, RectangleStackIcon, 
  ChatBubbleBottomCenterTextIcon, SparklesIcon, BeakerIcon, QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';
import { GiCrossedSwords, GiVintageRobot } from "react-icons/gi";




function UserGuidePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openSection, setOpenSection] = useState('dashboard'); // Keep track of which section is open

  function handleSidebarToggle(){
    setSidebarOpen(!sidebarOpen);
  }

  function handleToggleSection(sectionId) {
    // If the clicked section is already open, close it. Otherwise, open it.
    setOpenSection(prevOpenSection => (prevOpenSection === sectionId ? null : sectionId));
  };

const guideData = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: <HomeIcon className="h-6 w-6" />,
      content: (
        <ul className="list-disc space-y-2 pl-5">
          <li><b>Daily Goal:</b> Set a personal daily practice goal (between 0 and 100). The card on the dashboard tracks your progress across all learning modules (Lessons, Flashcards, Scenarios).</li>
          <li><b>Notifications:</b> Click the bell icon to view daily learning reminders and other important updates.</li>
          <li><b>Chat:</b> Click the chat bubble in the bottom right to talk with other users in real-time.</li>
          <li><b>Game Mechanics:</b> Each completed practice awards you 10 EXP.</li>
        </ul>
      )
    },
    {
      id: 'profile',
      title: 'My Profile',
      icon: <UserIcon className="h-6 w-6" />,
      content: (
        <ul className="list-disc space-y-2 pl-5">
          <li><b>Theme Switcher:</b> Customize your experience by switching between Light and Dark themes to suit your preference.</li>
          <li><b>Password Management:</b> Secure your account by updating your password at any time.</li>
          <li><b>Logout:</b> Logout from application whenever you've finished learning.</li>
        </ul>
      )
    },
     {
    id: 'lesson',
    title: 'Lesson',
    icon: <BookOpenIcon className="h-6 w-6" />,
    content: (
      <div>
        <p className="mb-4">
          This is instructor-led learning. The contents are created by your lecturers. If the page is blank, that means no contents uploaded yet.
        </p>
        <ul className="list-disc space-y-3 pl-5">
          <li>
            <b>One Chance to Answer:</b> Your first attempt at each question is your official answer. Take your time and choose carefully!
          </li>
          <li>
            <b>Instant Feedback:</b> After you submit your answer, the system will immediately tell you if you were correct and show you the right solution.
          </li>
          <li>
            <b>Automatic Review Mode:</b> Any time you revisit a completed question, you will see your previous answers and the correct solutions highlighted. This helps you quickly revise what you've learned without having to re-take the entire quiz.
          </li>
          <li>
            <b>Question Types:</b> Multiple choice, listening comprehension spoken by your lecturer, and sentence building.
          </li>
        </ul>
      </div>
    )
  },
    {
      id: 'flashcard',
      title: 'Flashcard',
      icon: <RectangleStackIcon className="h-6 w-6" />,
      content: (
        <>
         <p className="mb-4">
          This is self-paced learning. You define your own words to learn.
         </p>
        <ul className="list-disc space-y-2 pl-5">
          <li><b>Create Decks:</b> Organize your learning by creating custom flashcard decks with titles and descriptions.</li>
          <li><b>Add Cards:</b> Click on upper right edit button. Add as many Malay-English word pairs as you need to each deck.</li>
          <li><b>Practice Settings:</b> On a deck's detail page, you can toggle two powerful settings before starting a practice session:
            <ul className="list-disc space-y-1 pl-5 mt-2">
              <li><b>Shuffle:</b> Randomizes the card order to challenge your memory.</li>
              <li><b>Flip:</b> Chooses whether to show the Malay or English word first.</li>
            </ul>
          </li>
          <i>Hint:</i> Be prepared to receive notifications reminding you to practice your flashcards.
        </ul>
        </>
      )
    },
    {
      id: 'scenario',
      title: 'Learn From Situation',
      icon: <ChatBubbleBottomCenterTextIcon className="h-6 w-6" />,
      content: (
        <>
        <p>This is self-paced learning. It immerses you in real-world dialogues. You will encounter two main types of interactive practice:</p>
        <ul className="list-disc space-y-2 pl-5 mt-2">
          <li><b>Add Dialogue:</b> Click on upper right edit button. Question is shown on the other end in conversation. Response is shown on your end.</li>
          <li><b>Dialogue Order:</b> Question comes before Response with same order. Dialogue with same type and same order is not allowed. Max order is set to 5 to avoid length dialogue session.</li>
          <li><b>Speaking Practice:</b> Record your own voice, and our AI will transcribe it to check your pronunciation and accuracy.</li>
          <li><b>Listening Practice:</b> Key in the Malay word and let the AI do the job to generate an audio clip for you. You can choose either a male or female voice.</li>
          <i>Hint:</i> If you do not like the audio, you can try another one by switching between the audio options or close the sliding form to reset the audio.
        </ul>
        </>
      )
    },
    {
      id: 'character',
      title: 'Character',
      icon: <GiVintageRobot size={24} />,
      content: (
        <ul className="list-disc space-y-2 pl-5">
          <li><b>Choose Your First Partner:</b> When you start at Level 0, you choose your first companion to join you on your learning journey.</li>
          <li><b>Unlock One More Character:</b> As you learn and gain EXP, you level up. Reaching another level (Level 1) unlocks a new partner for your team.</li>
          <li><b>Primary Character:</b> Only 2 partners with you. Switch between them by setting either one as the primary.</li>
          <li><b>Character Usage:</b> You can find your primary character at different corners, chat room, dialogue session, flashcard practice and battle.</li>
        </ul>
      )
    },
    {
      id: 'battle',
      title: 'Battle',
      icon: <GiCrossedSwords size={24} />,
      content: (
        <>
        <p>Test your characters in a fun, turn-based battle system.</p>
        <ul className="list-disc space-y-2 pl-5 mt-2">
          <li><b>Listing Your Character:</b> You can "List" your primary character, making them available for other players to challenge. </li>
          <li><b>Challenging Others:</b> You can challenge any other users' character you see listed, even if your own character is not listed. If you win, you are rewarded with 5 EXP, else, he is rewarded with 5 EXP.</li>
          <li><b>Battle Mechanics:</b> Battles are not in real-time. It is just a simulated replay for a quick fun break. Do note that the elementary type does not impact the outcome.</li>
        </ul>
        </>
      )
    },
    {
      id: 'faq',
      title: 'FAQ',
      icon: <QuestionMarkCircleIcon className="h-6 w-6" />,
      content: (
        <>
        <p>Some general questions.</p>
        <ul className="list-disc space-y-2 pl-5 mt-2">
          <li><b>What are the ways to earn EXP?</b><br/>There are currently only two ways. Through learning practice (10 EXP) and through battles (5 EXP).</li>
          <li><b>What can I do with EXP or the level?</b><br/>Currently there is limited utility. The use case is you can showcase to other peers in chat room, and you gain advantage in battle if you are higher level.</li>
          <li><b>How does the level up works?</b><br/>This is a flat EXP gain mechanism. Every level requires exactly 100 EXP to the next level.</li>
          <li><b>What is the maximum level I can reached?</b><br/>There is no level limit for now. Level up as much as you wish. Focus less on levelling up but more on actual learning, that's the goal.</li>
          <li><b>What devices does this platform support?</b><br/>You can access this platform on any device with a modern web browser, including desktop computers, laptops, tablets, and smartphones, with a minimum screen size of 320px. Though larger screens give the optimized experience.</li>
          <li><b>How to get started?</b><br/>Start by unlocking your first partner. Then you are free to explore any of the three learning modules.</li>
        </ul>
        </>
      )
    }
  ];

  return (
    <div className='flex'>

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
      <div className="ml-0 sm:ml-64 flex-1 bg-slate-100 dark:bg-zinc-800 min-h-screen py-8 overflow-x-hidden">
        {/* User Guide Banner */}
        <Banner header="Documentation" title="Guide" onOpen={sidebarOpen} handleSidebarToggle={handleSidebarToggle} />

         <div className="p-4 sm:p-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-xl sm:text-3xl font-semibold dark:font-bold text-gray-900 dark:text-white mb-2">How to Use MelayuMate</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Find answers to common questions about the platform's features below.
            </p>
            
            {/* Accordion container */}
            <div className="space-y-4">
              {guideData.map((item) => (
                <AccordionItem
                  key={item.id}
                  title={item.title}
                  icon={item.icon}
                  isOpen={openSection === item.id}
                  onClick={() => handleToggleSection(item.id)}
                >
                  {item.content}
                </AccordionItem>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserGuidePage;