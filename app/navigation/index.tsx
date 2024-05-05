import {createNativeStackNavigator} from '@react-navigation/native-stack'; // Importing stack navigation from React Navigation
import NavigationProvider from 'app/providers/navigationProvider'; // Importing a custom navigation provider
import React from 'react';

//Screens
import NewsFeed from 'app/screens/newsFeed';

// Create a stack navigator instance for navigation between screens
const Stack = createNativeStackNavigator();

const NavigationContainer = () => {
  return (
    <NavigationProvider>
      {/* The stack navigator allows screen transitions and managing a stack of screens */}
      <Stack.Navigator>
        {/* Define a single screen in the stack with a specific name and component */}
        <Stack.Screen
          name="NewsFeed" // Unique name for this screen
          component={NewsFeed} // Component to render when this screen is active
          options={{title: 'Swipe for Updates'}} // Options for this screen, setting a custom title
        />
      </Stack.Navigator>
    </NavigationProvider>
  );
};

export default NavigationContainer;
