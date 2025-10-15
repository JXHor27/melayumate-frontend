import React from "react";
import DashboardPage from "./dashboard/DashboardPage";
import LessonPage from "./lesson/LessonPage";
import LessonQuiz from "../components/LessonQuiz";
import FlashcardPage from "./flashcard/FlashcardPage";
import FlashcardDetailPage from "./flashcard/FlashcardDetailPage";
import FlashcardEditPage from "./flashcard/FlashcardEditPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import PracticeFlashcards from "./flashcard/PracticeFlashcards";
import ScenarioPage from "./scenario/ScenarioPage";
import ProfilePage from "./profile/ProfilePage";
import CharacterPage from "./game/CharacterPage";
import GameShopPage from "./game/GameShopPage";
import DiscussionPage from "./community/DiscussionPage";
import DialoguePage from "./scenario/DialoguePage";
import ScenarioEditPage from "./scenario/ScenarioEditPage";
import { Outlet } from 'react-router-dom';

function EntryPage() {
  return (
    <>
        {/* <SidebarMenu/>
        <Routes>
            <Route path="/home" element={<DashboardPage />} />
            <Route path="/lesson" element={<LessonPage />} />
            <Route path="/flashcard" element={<FlashcardPage />} />
            <Route path="/flashcard/:listId" element={<FlashcardDetailPage />} />
            <Route path="/lesson/numbers" element={<LessonQuiz />} />
        </Routes> */}

      {/* element={<MainLayout />} */}
      <Routes> 
        {/* Routes with Sidebar */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/lesson" element={<LessonPage />} />
          <Route path="/flashcard" element={<FlashcardPage />} />
          <Route path="/situation" element={<ScenarioPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/character" element={<CharacterPage />} />
          <Route path="/gameshop" element={<GameShopPage />} />
          <Route path="/discussion" element={<DiscussionPage />} />
        </Route>

        {/* Routes without Sidebar */}
        <Route path="/flashcard/:listId" element={<FlashcardDetailPage />} />
        <Route path="/flashcard/:listId/edit" element={<FlashcardEditPage />} />
        <Route path="/flashcard/:listId/practice" element={<PracticeFlashcards />} />
        <Route path="/situation/:scenarioId" element={<DialoguePage />} />
        <Route path="/situation/:scenarioId/edit" element={<ScenarioEditPage />} />
        <Route path="/lesson/numbers" element={<LessonQuiz />} />
      </Routes>
    </>
   

  );
}

export default EntryPage