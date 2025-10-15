import React from 'react';
import ScenarioCard from "../../components/scenario/ScenarioCard"; 
import {FaRegWindowClose } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import chat from '../../assets/images/ground-bot.png';
import secondChat from '../../assets/images/second_chat_icon.png';
import thirdChat from '../../assets/images/third_chat_icon.png';
import SnackbarAlert from '../../components/common/SnackbarAlert';
import Banner from '../../components/common/Banner';
import SlidingSidebar from '../../components/common/SlidingSidebar';
import useRoot from '../../hooks/common/useRoot';
import useScenarioList from '../../hooks/scenario/useScenarioList';
import useScnarioManipulation from '../../hooks/scenario/useScenarioManipulation';
function ScenarioPage() {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
      title: '',
      description: '',
  });
  const [characterActive, setCharacterActive] = useState(true);
  const [characterTwoActive, setCharacterTwoActive] = useState(false);
  const [characterThreeActive, setCharacterThreeActive] = useState(false);
  const [scenarioCreatedSuccess, setScenarioCreatedSuccess] = useState(false)

  const { errorMessage, setErrorMessage } = useRoot();
  const { scenarioList, setScenarioList } = useScenarioList();
  const { createScenario, fetchScenarios } = useScnarioManipulation({ setScenarioList });
  
  function handleSidebarToggle(){
    setSidebarOpen(!sidebarOpen);
  }

  function handleScenarioSelect(scenarioId) {
    console.log(`User selected scenario: ${scenarioId}`);
    navigate(`/situation/${scenarioId}`)
  };

  async function handleCreateScenario() {
    if (!formData.title.trim()){
        return;
    }
    await createScenario(formData.title, formData.description);
    await fetchScenarios();
    setFormData({ title: '', description: '' });
    setShowForm(false);
    setScenarioCreatedSuccess(true);
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
      <div className="ml-0 sm:ml-64 flex-1 w-220 bg-zinc-800 min-h-screen py-8">
            {/* Learn from Situation Banner */}
            <Banner header="Learn from Situation" title="Scenario" onOpen={sidebarOpen} handleSidebarToggle={handleSidebarToggle} />
            
            {/* Create List Button */}
            <div className="flex justify-end mr-4 mb-6">
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded shadow cursor-pointer">
                Create Scenario
                </button>
            </div>
        
            {/* List of Scenarios */}
            <div className="flex flex-col gap-5 px-4">
                {scenarioList.map((scenario) => (
                  <div
                    key={scenario.scenarioId}
                    onClick={() => handleScenarioSelect(scenario.scenarioId)}
                    className="border-b-2 border-amber-300 flex justify-between items-center bg-gradient-to-r from-zinc-700 to-zinc-500 p-5 rounded-xl cursor-pointer break-all">
                    <div className="">
                      <h2 className="text-xl font-semibold text-white mb-2">{scenario.title}</h2>
                      <p className="text-base text-gray-300">{scenario.description}</p>
                    </div>
                  </div>
                ))}
            </div>

            {/* Sliding List Creation Form */}
            <div className={`fixed top-0 right-0 h-full w-75 bg-zinc-900 text-white shadow-lg transform transition-transform duration-300 z-50 ${showForm ? 'translate-x-0' : 'translate-x-full'}`}>
              <div className="p-4 flex justify-between items-start border-b-1 border-zinc-600">
                <h3 className="text-lg font-semibold">New Scenario</h3>
                <button onClick={() => {setShowForm(false); setFormData({ title: '', description: '' });}} className="text-white text-xl hover:text-red-400 cursor-pointer">
                  <FaRegWindowClose size={29}/>
                </button>
              </div>
              <div className="p-4">
                    <input
                        type="text"
                        maxLength={20}
                        placeholder="Title"
                        className="w-full p-2 mb-1 rounded bg-zinc-700 border border-zinc-600"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}/>
                        <p className="text-sm text-zinc-400 mb-5">{formData.title.length}/20 characters</p>
                        <textarea
                          placeholder="Description (Optional)"
                          maxLength={60}
                          className="h-30 w-full p-2 rounded bg-zinc-700 border border-zinc-600"
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}/>
                        <p className="text-sm text-zinc-400 mb-5">{formData.description.length}/60 characters</p>
                        <p className="text-sm text-white mb-5">Select a character</p>
                        <div className='flex mb-5'>
                          <img onClick={() => {setCharacterActive(!characterActive); setCharacterTwoActive(false); setCharacterThreeActive(false)}} src={chat} alt="Character Avatar" className={`w-15 h-15 rounded-full mr-4 cursor-pointer ${characterActive ? 'bg-black':'hover:bg-zinc-900'}`} />
                          <img onClick={() => {setCharacterTwoActive(!characterTwoActive); setCharacterActive(false); setCharacterThreeActive(false)}} src={thirdChat} alt="Character Avatar" className={`w-15 h-15 rounded-full mr-4 cursor-pointer ${characterTwoActive ? 'bg-black':'hover:bg-zinc-900'}`} />
                          <img onClick={() => {setCharacterThreeActive(!characterThreeActive); setCharacterActive(false); setCharacterTwoActive(false)}} src={secondChat} alt="Character Avatar" className={`w-15 h-15 rounded-full mr-4 cursor-pointer ${characterThreeActive ? 'bg-black':'hover:bg-zinc-900'}`} />
                        </div>
                        <button
                          onClick={handleCreateScenario}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full cursor-pointer"
                        >
                          Submit
                        </button>
              </div>
            </div>

            {/* Success Scenario Created Alert */}
            <SnackbarAlert
              open={scenarioCreatedSuccess}
              onClose={() => setScenarioCreatedSuccess(false)}
              severity="success"
              message="Scenario created."
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
};

export default ScenarioPage;