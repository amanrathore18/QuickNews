# News Feed App - React Native

This is a single-screen news feed application developed with [**React Native**](https://reactnative.dev), bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli), and built with TypeScript. The app features a custom swipe button that triggers news fetching from a public API.

## Objective and Features

- **Custom Swipe Control:** The application contains a custom swipe button that, when interacted with (swiped fully to the right), fetches news articles.
- **Data Fetching:** Uses the `useSWR` hook to fetch news from a public API, efficiently managing caching and revalidation.
- **News Display:** Initially, the news list is empty. Once the swipe action is completed, news items are fetched and displayed. The news includes titles, sources, summaries, and images.
- **UI/UX Design:** Offers a simple and intuitive user interface with animations to indicate the state of the custom swipe button.

## Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

### Prerequisites

- Node.js and npm installed
- React Native CLI
- Proper setup of Android Studio and Xcode for building and running React Native projects

### Step 1: Setup Environment Variables

Create a `.env` file in the root folder of your project and paste any required content or environment-specific variables. This might include the API key for the public news API or any other configurations required for the app to run properly.

### Step 2: Install node modules

Install **node modules**:

```bash
# using npm
npm i
```

### Step 3: Start the Metro Server

Start **Metro**, the JavaScript _bundler_ for React Native, by running the following command from the _root_ of your project:

```bash
# using npm
npm start
```

### Step 3: Start your Application

With Metro running in its own terminal, open a new terminal in the project root and start your application with the following commands:

For Android

```bash
# using npm
npm run android
```

For iOS

```bash
# using npm
npm run ios
```

Ensure your Android Emulator or iOS Simulator is properly set up and running. Once the app is running, you can start using the custom swipe button to fetch and display news articles.
