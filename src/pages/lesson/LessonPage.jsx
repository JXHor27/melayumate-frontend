import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import Banner from '../../components/common/Banner';
import SlidingSidebar from '../../components/common/SlidingSidebar';
import LessonCard from '../../components/lesson/LessonCard'; 
import useLessonDetail from "../../hooks/lesson/useLessonDetail";

function LessonPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { lessons } = useLessonDetail();

  function handleSidebarToggle(){
    setSidebarOpen(!sidebarOpen);
  }

  function handleStartLesson(lessonId) {
    // Navigate to the individual lesson page where questions will be shown
    navigate(`/lesson/${lessonId}`);
  }

  return (
    <div className="flex">
      <SlidingSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50" // Added a semi-transparent overlay
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="ml-0 sm:ml-64 flex-1 w-220 bg-slate-100 dark:bg-zinc-800 min-h-screen py-8">
        {/* Lesson Banner */}
        <Banner header="Lesson" title="Lesson" onOpen={sidebarOpen} handleSidebarToggle={handleSidebarToggle}/>

        {/* --- NEW: Lesson Content Grid --- */}
        <div className="p-4 sm:p-8">
          <div className="max-w-6xl mx-auto">
            {/* <h1 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">Your Learning Path</h1> */}
            
            {/* Grid container for the lesson cards */}
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
              {lessons.map(lesson => (
                <LessonCard 
                  key={lesson.lessonId}
                  lesson={lesson}
                  onStart={() => handleStartLesson(lesson.lessonId)}
                />
              ))}
            </div>
          </div>
        </div>
        {/* ----------------------------- */}

      </div>
    </div>
  );
}

export default LessonPage;
