import React, { useEffect, useState, useRef } from 'react';
import useMalayaSpeechService from '../../hooks/scenario/useMalayaSpeechService';
import SnackbarAlert from '../common/SnackbarAlert';
import { MediaRecorder } from 'extendable-media-recorder';
import OkDialog from '../common/OkDialog';
function AudioSelection({ malayText, generateBlobData, generateObjectUrl, audioObjectUrl, generateRecordBlobData, generateRecordUrl, recordUrl }) {

  /* Error handling alert section */
  const [audioGeneratedError, setAudioGeneratedError] = useState(false);
  const [audioTranscribedError, setAudioTranscribedError] = useState(false);
  const [malayEmptyError, setMalayEmptyError] = useState(false);

  // State to track the active audio option ('none', 'ai', or 'record')
  const [activeOption, setActiveOption] = useState('none');
  
  // State to track the selected gender for the AI voice ('male' or 'female')
  const [gender, setGender] = useState('male');
  const [audioUrl, setAudioUrl] = useState(audioObjectUrl);
  const [audioBlob, setAudioBlob] = useState(null);
  const [loading, setLoading] = useState(false);

  /* Recording section */
  const MAX_RECORDING_SECONDS = 8;
  const [recordingStatus, setRecordingStatus] = useState('inactive'); // 'inactive', 'recording', 'finished'
  const [recordAudioUrl, setRecordAudioUrl] = useState(recordUrl);
  const [recordAudioBlob, setRecordAudioBlob] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [transcribeLoading, setTranscribeLoading] = useState(false);
  const [transcriptionResult, setTranscriptionResult] = useState('');
  const [audioTranscriptionResult, setAudioTranscriptionResult] = useState(false);

  // Refs for the recorder instance and timers
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const intervalRef = useRef(null);
  const timeoutRef = useRef(null);


  const { generateAudio, transcribeAudio } = useMalayaSpeechService();

  useEffect(() => {
    console.log("Audio Object URL:", audioObjectUrl)
    setAudioUrl(audioObjectUrl);
  }, [audioObjectUrl]);

   useEffect(() => {
    console.log("Record URL:", recordUrl)
    if(recordUrl===null)
      setRecordingStatus('inactive')
    setRecordAudioUrl(recordUrl);
  }, [recordUrl]);


  // Helper function to apply conditional classes for the active button
  function getButtonClasses(option) {
    return activeOption === option
      ? 'bg-blue-500 text-white disabled:opacity-90' // Active state
      : 'bg-gray-50 text-gray-900 hover:bg-gray-200 dark:bg-gray-300 dark:text-gray-800 dark:hover:bg-gray-400 cursor-pointer'; // Inactive state
  };

  function getGenderButtonClasses(option) {
    return gender === option
      ? 'bg-blue-500 text-white'
      : 'bg-gray-200 text-gray-900 hover:bg-gray-300 cursor-pointer';
  }

  function sendBlobToParent(data) {
    generateBlobData(data);
  };

  function sendObjectUrltoParent(data) {
    generateObjectUrl(data);
  }

  function sendRecordBlobToParent(data) {
    generateRecordBlobData(data);
  };

  function sendRecordUrltoParent(data) {
    generateRecordUrl(data);
  }
 
  async function handleGenerateAudio() {
    if (!malayText.trim()){
      setMalayEmptyError(true);
      return;
    }
    setLoading(true);
    setAudioUrl(null);
    const blob = await generateAudio(malayText, gender);
    if (!blob) {
      setLoading(false);
      setAudioGeneratedError(true);
      return;
    }
    setAudioBlob(blob);
    const url = URL.createObjectURL(blob);
    sendBlobToParent(blob);
    sendObjectUrltoParent(url);
    console.log(blob);
    console.log(url);
    setAudioUrl(url);
    setLoading(false);
  };

  async function handleTranscribeAudio() {
    setTranscribeLoading(true);
    const transcribedText = await transcribeAudio(recordAudioBlob);
    if (!transcribedText) {
      setTranscribeLoading(false);
      setAudioTranscribedError(true);
      return;
    }
    setTranscriptionResult(transcribedText);
    setAudioTranscriptionResult(true);
    if (transcribedText) {
      console.log("Transcription result:", transcribedText);
    } else {
      console.error("Transcription failed.");
    }
    setTranscribeLoading(false);
  }

   async function startRecording() {
    resetRecording(); 
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/wav' });
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.addEventListener('dataavailable', (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      });

      mediaRecorder.addEventListener('stop', () => {
        // The library handles the encoding. The blob here is a real WAV blob.
        const wavBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const url = URL.createObjectURL(wavBlob);
        setRecordAudioBlob(wavBlob);
        setRecordAudioUrl(url);
        sendRecordBlobToParent(wavBlob);
        sendRecordUrltoParent(url);
        setRecordingStatus("finished");
        // Stop all audio tracks to release the microphone
        stream.getTracks().forEach(track => track.stop()); 
      });

      audioChunksRef.current = [];
      mediaRecorder.start();
      setRecordingStatus("recording");
      setElapsedTime(0); 

      intervalRef.current = setInterval(() => {
          setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);

     timeoutRef.current = setTimeout(() => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
          stopRecording();
        }
      }, MAX_RECORDING_SECONDS * 1000);

    } catch (err) {
      console.error("Error starting recording:", err);
    }
  };

  async function stopRecording() {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      cleanupTimers();
    }
  };

  function resetRecording() {
    cleanupTimers();
    setRecordAudioUrl('');
    setRecordAudioBlob(null);
    setElapsedTime(0);
    audioChunksRef.current = [];
  };

  function cleanupTimers() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };


  return (
    <div className="w-full max-w-lg p-3 mx-auto mt-2 mb-2 bg-stone-50 dark:bg-zinc-950 rounded-lg shadow-md">
      {/* Section Header */}
      <div className="flex items-center mb-2">
        <div className="flex-grow border-t border-gray-600"></div>
        <span className="px-3 text-sm font-semibold text-gray-900 dark:text-gray-300">Attach Audio</span>
        <div className="flex-grow border-t border-gray-600"></div>
      </div>

      {/* Segmented Control for Audio Type */}
      <div className="flex w-full p-2 space-x-1 bg-stone-400 dark:bg-gray-700 rounded-lg">
        <button
          onClick={() => {setActiveOption('none'); stopRecording(); sendBlobToParent(null); sendRecordBlobToParent(null);}}
          className={`shadow-lg w-full px-2 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${getButtonClasses('none')}`}
        >
          No Audio
        </button>
        <button
          onClick={() => {setActiveOption('ai'); setAudioUrl(null); sendRecordBlobToParent(null); stopRecording();}}
          className={`shadow-lg w-full px-2 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${getButtonClasses('ai')}`}
          disabled={activeOption==='ai'}
        >
          AI-Generated
        </button>
        <button
          onClick={() => {setActiveOption('record'); setRecordAudioUrl(null); sendBlobToParent(null); setRecordingStatus('inactive'); stopRecording();}}
          className={`shadow-lg w-full px-2 py-2 text-sm font-medium transition-colors duration-200 rounded-md ${getButtonClasses('record')}`}
          disabled={activeOption==='record'}
        >
          Record
        </button>
      </div>

      {/* --- Conditional UI Section --- */}
      <div className="mt-2"> {/* Added min-height to prevent layout shifts */}
        {/* UI for AI-Generated Audio */}
        {activeOption === 'ai' && (
          <div className="p-1 text-center bg-gray-400/50 dark:bg-gray-700/50 rounded-lg">
            <p className="text-sm text-gray-300">
              {/* Choose a voice for the generated audio based on the Malay text. */}
            </p>
            
            {/* Gender Selection */}
            <div className="flex items-center justify-center mb-3 space-x-4">
              <span className="text-sm font-medium text-gray-900 dark:text-gray-200">Voice:</span>
              <div className="flex p-1 space-x-1 bg-stone-400 dark:bg-gray-600 rounded-lg">
                <button 
                  onClick={() => setGender('male')}
                  className={`px-5 py-1 text-sm rounded-md transition-colors ${getGenderButtonClasses('male')}`}
                >
                  Male
                </button>
                <button 
                  onClick={() => setGender('female')}
                  className={`px-5 py-1 text-sm rounded-md transition-colors ${getGenderButtonClasses('female')}`}
                >
                  Female
                </button>
              </div>
            </div>

            {!audioUrl && (
              <button
                className="shadow-lg w-full px-4 py-2 font-semibold bg-slate-50 dark:bg-zinc-700 hover:bg-slate-200 dark:hover:bg-zinc-600 text-gray-900 dark:text-white rounded-lg cursor-pointer"
                onClick={handleGenerateAudio}
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate Audio"}
              </button>
            )}
            {audioUrl && (
              <audio controls src={audioUrl} className="w-full h-10" />
            )}
          </div>
        )}

        {/* UI for User Recording */}
        {activeOption === 'record' && (
          <div className="p-1 text-center bg-gray-400/50 dark:bg-gray-700/50 rounded-lg">
            {recordingStatus === 'inactive' && (<p className="mb-3 text-sm text-gray-900 dark:text-gray-300">
              Record your own voice reading the Malay text.
            </p>
            )}
            {recordingStatus === 'inactive' && (
            <button className="shadow-lg w-full px-4 py-2 font-semibold bg-slate-50 dark:bg-zinc-700 hover:bg-slate-200 dark:hover:bg-zinc-600 text-gray-900 dark:text-white rounded-lg cursor-pointer" 
            onClick={startRecording}>Start Recording</button>
            )}

            {recordingStatus === 'recording' && (
            <div>
              <button className="w-full px-4 py-2 font-semibold text-white bg-gradient-to-br from-green-300 to-emerald-500 rounded-lg cursor-pointer"
              onClick={stopRecording}>Stop Recording</button>
              <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5">
                {/* The moving part of the bar */}
                <div 
                  className="bg-red-600 h-2.5 rounded-full transition-all duration-1000 ease-linear" 
                  style={{ width: `${(elapsedTime / MAX_RECORDING_SECONDS) * 100}%` }}
                ></div>
              </div>
              <p className="text-center text-sm mt-2">
                {elapsedTime}s / {MAX_RECORDING_SECONDS}s
              </p>
            </div>
            )}
            {recordAudioUrl && (
              <audio controls src={recordAudioUrl} className="w-full mb-2 h-10" />
            )}

            {recordingStatus === 'finished' && (
             <button 
             onClick={handleTranscribeAudio}
             className="shadow-lg w-full px-4 py-2 font-semibold bg-slate-50 dark:bg-zinc-700 hover:bg-slate-200 dark:hover:bg-zinc-600 text-gray-900 dark:text-white rounded-lg cursor-pointer"
             disabled={transcribeLoading}>
               {transcribeLoading ? "Transcribing..." : "Transcribe Audio"}
            </button>
            )}

          </div>

        )}
        {/* UI for "No Audio" */}
        {activeOption === 'none' && (
              <div className="flex items-center justify-center h-full p-4">
                  <p className="text-sm text-gray-900 dark:text-gray-300">No audio will be attached to this message.</p>
              </div>
        )}
      </div>

      {/* Audio Transcription Result */}
      <OkDialog
        open={audioTranscriptionResult}
        onClose={() => setAudioTranscriptionResult(false)}
        title="Transcription Result"
        message={transcriptionResult}
      />


      {/* Malay Empty Alert */}
      <SnackbarAlert
        open={malayEmptyError}
        onClose={() => setMalayEmptyError(false)}
        severity="error"
        message="Please fill in Malay word before generate audio."
      />

      {/* Fail to Generate Audio Alert */}
      <SnackbarAlert
        open={audioGeneratedError}
        onClose={() => setAudioGeneratedError(false)}
        severity="error"
        message="Audio generation failed. Please try again."
      />

      {/* Fail to Transcribe Audio Alert */}
      <SnackbarAlert
        open={audioTranscribedError}
        onClose={() => setAudioTranscribedError(false)}
        severity="error"
        message="Audio transcription failed. Please try again."
      />
    </div>
  );
};

export default AudioSelection;