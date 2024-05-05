import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

// Constants for button dimensions and swipe ranges
const {width: SCREEN_WIDTH} = Dimensions.get('window'); // Get screen width
const BUTTON_WIDTH = SCREEN_WIDTH - 48; // Button width with some margin
const BUTTON_HEIGHT = 60; // Button height
const BUTTON_PADDING = 10; // Padding inside the button
const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 2 * BUTTON_PADDING; // Diameter of the swipeable circle

const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS + 2 * BUTTON_PADDING; // Gradient width during swipe
const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS; // Maximum swipe distance

interface SwipeButtonProps {
  onSwipeRight: () => void;
}

// Component representing the swipe button
const SwipeButton: React.FC<SwipeButtonProps> = ({onSwipeRight}) => {
  const sharedValue = useSharedValue(0); // Shared value for swipe position
  const [resetTimer, setResetTimer] = useState(null); // Timer to reset swipe position

  // Function to reset the swipe position
  const resetToInitialState = () => {
    sharedValue.value = withSpring(0); // Reset with a spring animation
  };

  // Trigger a reset timer when swipe action completes
  const triggerResetTimer = () => {
    if (resetTimer) {
      clearTimeout(resetTimer); // Clear existing timer if any
    }
    const timer = setTimeout(() => {
      runOnJS(resetToInitialState)(); // Reset after 2 seconds
    }, 2000); // Reset delay
    setResetTimer(timer); // Store the new timer
  };

  // Cleanup timer when component unmounts
  useEffect(() => {
    return () => {
      if (resetTimer) {
        clearTimeout(resetTimer);
      }
    };
  }, [resetTimer]);

  // Gesture handler for swipe action
  const gestureHandler = useAnimatedGestureHandler({
    onActive: event => {
      let newValue = event.translationX; // Get the horizontal translation during swipe

      // Clamp the value to ensure it doesn't go out of bounds
      if (newValue < 0) {
        newValue = 0;
      } else if (newValue > H_SWIPE_RANGE) {
        newValue = H_SWIPE_RANGE;
      }

      sharedValue.value = newValue; // Update the shared value
    },
    onEnd: () => {
      const threshold =
        BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS / 2 - 2 * BUTTON_PADDING; // Determine the threshold for a successful swipe

      if (sharedValue.value >= threshold) {
        sharedValue.value = withSpring(H_SWIPE_RANGE); // If successful, complete the swipe
        runOnJS(onSwipeRight)(); // Trigger the fetch action
        runOnJS(triggerResetTimer)(); // Start the reset timer
      } else {
        sharedValue.value = withSpring(0); // Otherwise, reset to initial position
      }
    },
  });

  // Style for the swipeable circle
  const animatedSwipeStyle = useAnimatedStyle(() => ({
    transform: [{translateX: sharedValue.value}], // Move the circle according to the swipe
    backgroundColor: interpolateColor(
      sharedValue.value,
      [0, H_SWIPE_RANGE], // Interpolate color based on swipe position
      ['#1b9aaa', '#fff'], // From initial color to white
    ),
  }));

  // Style for the instruction text
  const animatedTextStyle = useAnimatedStyle(() => ({
    opacity: interpolate(sharedValue.value, [0, H_SWIPE_RANGE], [0.7, 0]), // Text fades as swipe progresses
    transform: [
      {
        translateX: interpolate(
          sharedValue.value,
          [0, H_SWIPE_RANGE], // Text moves to the left as swipe progresses
          [0, BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS], // Distance to move
        ),
      },
    ],
  }));

  // Style for the gradient background that expands during swipe
  const animatedGradientStyle = useAnimatedStyle(() => ({
    width: H_WAVE_RANGE + sharedValue.value, // Gradient width increases with swipe
    opacity: interpolate(sharedValue.value, [0, H_SWIPE_RANGE], [0, 1]), // Gradient opacity increases as it swipes
  }));

  return (
    <View style={styles.container}>
      {/* Gradient background */}
      <Animated.View style={[styles.gradientBackground, animatedGradientStyle]}>
        <LinearGradient
          colors={['#dd91f2', '#1b9aaa']} // Gradient color transition
          start={{x: 0, y: 0.5}} // Gradient start point
          end={{x: 1, y: 0.5}} // Gradient end point
          style={styles.gradient}
        />
      </Animated.View>

      {/* Swipeable circle */}
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.swipeableCircle, animatedSwipeStyle]} />
      </PanGestureHandler>

      {/* Instruction text */}
      <Animated.Text style={[styles.text, animatedTextStyle]}>
        Swipe to Fetch News
      </Animated.Text>
    </View>
  );
};

// Styles for the swipe button and other elements
const styles = StyleSheet.create({
  container: {
    height: BUTTON_HEIGHT, // Height of the container
    width: BUTTON_WIDTH, // Width of the container
    backgroundColor: '#f2f2f2', // Background color
    borderRadius: 50, // Rounded corners
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
    alignSelf: 'center', // Center the container on the screen
    borderWidth: 1, // Border thickness
    borderColor: '#1b9aaa', // Border color
  },
  gradientBackground: {
    position: 'absolute', // Absolute positioning to ensure it sits below other elements
    height: BUTTON_HEIGHT, // Gradient height
    borderRadius: 50, // Rounded corners
  },
  gradient: {
    height: BUTTON_HEIGHT, // Height of the gradient
    borderRadius: 50, // Rounded corners
  },
  swipeableCircle: {
    height: SWIPEABLE_DIMENSIONS, // Circle height
    width: SWIPEABLE_DIMENSIONS, // Circle width
    borderRadius: 25, // Circular shape
    position: 'absolute', // Positioned to move within the parent
    left: BUTTON_PADDING, // Initial position at the left
  },
  text: {
    fontSize: 18, // Font size for the text
    color: '#1b9aaa', // Text color
  },
});

export default SwipeButton; // Export the component for use in other parts of the app
