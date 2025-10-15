// --- HELPER FUNCTION: Formats chat message timestamp 
function formatTimestamp(isoDateString) {
  return new Date(isoDateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

export default formatTimestamp;