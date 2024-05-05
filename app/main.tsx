import AppNavigation from 'app/navigation'; // Importing the main navigation component
import GestureWrapper from 'app/providers/gestureProvider'; // Importing a gesture handling wrapper
import React from 'react';

// Main application component
const App = () => {
  // Wrapping the application with GestureWrapper, which provide gesture-based features
  // such as swipe navigation or other gesture-based interactions
  return (
    <GestureWrapper>
      {/* The main navigation structure of the application */}
      <AppNavigation />
    </GestureWrapper>
  );
};

export default App;
