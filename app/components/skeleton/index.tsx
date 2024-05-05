import {COLORS} from 'app/theme/theme.style'; // Importing predefined colors
import React, {useEffect, useRef} from 'react'; // React core functionalities
import {Animated, Easing, StyleProp, StyleSheet, ViewStyle} from 'react-native'; // React Native core components

// Define properties that can be passed to the Skeleton component
interface SkeletonProps {
  height?: number | string; // The height of the skeleton loader
  width?: number | string; // The width of the skeleton loader
  borderRadius?: number; // Border radius for rounded corners
  testID?: string; // Test ID for testing frameworks
  style?: StyleProp<ViewStyle>; // Additional styles to apply
}

// The Skeleton component definition
const Skeleton = ({
  width = 100, // Default width
  height = 12, // Default height
  borderRadius = 4, // Default border radius
  style, // Additional style that can be applied
  testID = '', // Default test ID
}: SkeletonProps) => {
  // Create a reference for animation value
  const opacity = useRef(new Animated.Value(1)).current; // Default opacity

  // Define the animation sequence and start it on component mount
  useEffect(() => {
    Animated.loop(
      Animated.timing(opacity, {
        toValue: 100, // Final value for animation
        useNativeDriver: true, // Optimize using native animation driver
        duration: 2000, // Animation duration in milliseconds
        easing: Easing.ease, // Easing function for smooth transitions
      }),
    ).start(); // Start the animation loop
  }, [opacity]); // The effect depends on the `opacity` value

  // Interpolation for animating opacity
  const opacityValue = opacity.interpolate({
    inputRange: [1, 50, 100], // Input range for animation
    outputRange: [0, 1, 0], // Output range for opacity changes
  });

  // Render the skeleton loader with an Animated.ScrollView
  return (
    <Animated.View // Animated component to apply the animation
      testID={`${testID}-skeleton`} // Test ID for testing frameworks
      style={StyleSheet.flatten([
        {
          width, // Apply the specified width
          height, // Apply the specified height
          opacity: opacityValue, // Use the interpolated opacity value
          backgroundColor: COLORS.black50, // Default skeleton color
          borderRadius, // Border radius for rounded corners
        },
        style, // Merge with any additional styles
      ])}
    />
  );
};

// Export the Skeleton component as the default export
export default Skeleton;

// Define local styles for the Skeleton component (optional)
