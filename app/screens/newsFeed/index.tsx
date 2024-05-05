import CustomSwipeButton from 'app/components/button/swipeButton'; // Custom swipe button component
import CommonStyles from 'app/theme/common.styles'; // Common styles used throughout the app
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import NewsFeedList from './components/newsFeedList'; // The component that displays the list of news

// Main component representing the news feed screen
const NewsFeed = (props: any) => {
  const {navigation} = props; // Destructure navigation from props
  const [showNewsFeed, setShowNewsFeed] = useState<boolean>(false); // State to control when to show the news feed

  // Event handler for when the custom swipe button is swiped to the right
  const onSwipeRight = () => {
    // Change the screen title in the navigation header
    navigation.setOptions({
      title: 'News Feed', // New title for the screen after swipe
    });
    setShowNewsFeed(true); // Set state to show the news feed list
  };

  // If `showNewsFeed` is true, display the NewsFeedList component
  if (showNewsFeed) {
    return <NewsFeedList />; // Render the list of news articles
  }

  // If `showNewsFeed` is false, display a prompt to swipe the button
  return (
    <View style={CommonStyles.centeredView}>
      <Text style={styles.header}>News Feed App</Text>
      <Text style={styles.description}>
        Swipe the button to the right to fetch the latest news.
      </Text>
      {/*  Custom swipe button with an event handler */}
      <CustomSwipeButton onSwipeRight={onSwipeRight} />
    </View>
  );
};

// Define local styles specific to this component
const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginVertical: 10,
    marginBottom: 30,
  },
});

export default NewsFeed; // Export the component as the default export
