import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from './context/AuthContext';

// --- ONE-TIME RECORDER SETUP ---
import { MediaRecorder, register } from 'extendable-media-recorder';
import { connect } from 'extendable-media-recorder-wav-encoder';

// This is the magic. It teaches the MediaRecorder polyfill about the WAV encoder.
async function setupRecorder() {
  await connect();
  await register(await connect());
}

setupRecorder().then(() => {
  createRoot(document.getElementById('root')).render(
  <>
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
  </>
  )
});

