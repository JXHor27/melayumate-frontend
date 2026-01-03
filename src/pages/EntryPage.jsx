import React from "react";
import DashboardPage from "./dashboard/DashboardPage";
import LessonPage from "./lesson/LessonPage";
import QuestionPage from "./lesson/QuestionPage";
import FlashcardPage from "./flashcard/FlashcardPage";
import FlashcardDetailPage from "./flashcard/FlashcardDetailPage";
import FlashcardEditPage from "./flashcard/FlashcardEditPage";
import FlashcardPracticePage from "./flashcard/FlashcardPracticePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./MainLayout";
import ScenarioPage from "./scenario/ScenarioPage";
import ProfilePage from "./profile/ProfilePage";
import CharacterPage from "./game/CharacterPage";
import BattleLobbyPage from "./game/BattleLobbyPage";
import UserGuidePage from "./documentation/UserGuidePage";
import DialoguePage from "./scenario/DialoguePage";
import ScenarioEditPage from "./scenario/ScenarioEditPage";
import BattleScenePage from "./game/BattleScenePage";
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
          <Route path="/battle" element={<BattleLobbyPage />} />
          <Route path="/guide" element={<UserGuidePage />} />
        </Route>

        {/* Routes without Sidebar */}
        <Route path="/flashcard/:listId" element={<FlashcardDetailPage />} />
        <Route path="/flashcard/:listId/edit" element={<FlashcardEditPage />} />
        <Route path="/flashcard/:listId/practice" element={<FlashcardPracticePage />} />
        <Route path="/situation/:scenarioId" element={<DialoguePage />} />
        <Route path="/situation/:scenarioId/edit" element={<ScenarioEditPage />} />
        <Route path="/battle/challenge/:battleId" element={<BattleScenePage />} />
        <Route path="/lesson/:lessonId" element={<QuestionPage />} />
      </Routes>
    </>
   

  );
}

export default EntryPage