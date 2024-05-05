import CommonStyles from 'app/theme/common.styles';
import React from 'react';
import {ViewStyle} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

interface GestureProviderProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const GestureProvider: React.FC<GestureProviderProps> = ({children, style}) => {
  return (
    <GestureHandlerRootView style={[CommonStyles.container, style]}>
      {children}
    </GestureHandlerRootView>
  );
};

export default GestureProvider;
