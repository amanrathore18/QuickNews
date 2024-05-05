import {StyleSheet} from 'react-native';
import {COLORS} from './theme.style';

const CommonStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default CommonStyles;
