import React from 'react';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { FaRegWindowClose } from 'react-icons/fa';

import SnackbarAlert from '../../components/common/SnackbarAlert';
import Banner from '../../components/common/Banner';
import SlidingSidebar from '../../components/common/SlidingSidebar';
import ScenarioCard from '../../components/scenario/ScenarioCard'; // New

import useRoot from '../../hooks/common/useRoot';
import useScenarioList from '../../hooks/scenario/useScenarioList';
import useScenarioManipulation from '../../hooks/scenario/useScenarioManipulation';

function ScenarioPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  
  // Consolidate success/error feedback into one state
  const [feedback, setFeedback] = useState({ open: false, message: '', severity: 'info' });

  const { scenarioList, setScenarioList } = useScenarioList();
  const { createScenario, fetchScenarios } = useScenarioManipulation({ setScenarioList });
  
  function handleSidebarToggle() {
    setSidebarOpen(!sidebarOpen);
  }

  function handleScenarioSelect(scenarioId) {
    navigate(`/situation/${scenarioId}`);
  };

  async function handleCreateScenario() {
    if (!formData.title.trim()){
      setFeedback({ open: true, message: 'Please fill in a title.', severity: 'error' });  
      return;
    }
    await createScenario(formData.title, formData.description);
    await fetchScenarios();
    setFormData({ title: '', description: '' });
    setShowForm(false);
    setFeedback({ open: true, message: 'Scenario created.', severity: 'success' });  
  };

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

      {/* Create Scenario Form Overlay */}
      {showForm && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowForm(false)}
          style={{ pointerEvents: "auto" }}
        />
      )}

      {/* Main Content */}
      <div className="ml-0 sm:ml-64 flex-1 w-220 bg-slate-100 dark:bg-zinc-800 min-h-screen py-8">
         {/* Scenario Banner */}
        <Banner header="Learn from Situation" title="Scenario" onOpen={sidebarOpen} handleSidebarToggle={handleSidebarToggle} />
            
        {/* Header Create button */}
        <div className="flex justify-end mr-4 mb-6">
          <button
            onClick={() => setShowForm(true)}
            className="shadow-lg dark:shadow-gray-800 bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded cursor-pointer">
                Create Scenario
          </button>
        </div>
        <div className="p-4 sm:p-8 max-w-7xl mx-auto">
          {/* Grid of Scenario Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {scenarioList.map((scenario) => (
                <ScenarioCard
                  key={scenario.scenarioId}
                  scenario={scenario}
                  onSelect={() => handleScenarioSelect(scenario.scenarioId)}
                />
              ))}
            </div>
        </div>
      </div>
      
      {/* Sliding List Creation Form */}
      <div className={`fixed top-0 right-0 h-full w-75 bg-slate-300 dark:bg-zinc-900 text-black dark:text-white shadow-lg transform transition-transform duration-300 z-50 ${showForm ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4 flex justify-between items-start border-b-1 border-zinc-600">
            <h3 className="text-lg font-semibold">New Scenario</h3>
            <button onClick={() => {setShowForm(false); setFormData({ title: '', description: '' });}} className="text-black dark:text-white text-xl hover:text-red-400 cursor-pointer">
              <FaRegWindowClose size={29} />
            </button>
          </div>
          <div className="p-4">
                <input
                    type="text"
                    maxLength={20}
                    placeholder="Title"
                    className="w-full p-2 mb-1 rounded bg-slate-100 dark:bg-zinc-700 border border-zinc-600"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}/>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-5">{formData.title.length}/20 characters</p>
                    <textarea
                      placeholder="Description (Optional)"
                      maxLength={60}
                      className="h-30 w-full p-2 rounded bg-slate-100 dark:bg-zinc-700 border border-zinc-600"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}/>
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-5">{formData.description.length}/60 characters</p>
                    <button
                      onClick={handleCreateScenario}
                      className="shadow-lg dark:shadow-gray-800 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full cursor-pointer"
                    >
                      Submit
                    </button>
          </div>
      </div>
      
      {/* A single, centralized Snackbar for all feedback */}
      <SnackbarAlert
          open={feedback.open}
          onClose={() => setFeedback({ ...feedback, open: false })}
          severity={feedback.severity}
          message={feedback.message}
      />
    </div>
  );
};

export default ScenarioPage;