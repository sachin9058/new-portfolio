import React, { useState, useCallback } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import BootScreen from './components/BootScreen';
import Desktop from './components/Desktop';

export default function App() {
  const [booted, setBooted] = useState(false);

  const handleBootComplete = useCallback(() => {
    setBooted(true);
  }, []);

  return (
    <ThemeProvider>
      {!booted && <BootScreen onComplete={handleBootComplete} />}
      {booted && <Desktop />}
    </ThemeProvider>
  );
}
