import {Dimensions, StyleSheet} from 'react-native';

const {height} = Dimensions.get('window');

export default StyleSheet.create({
  safeAreaView: {
    flex: 1,
    maxHeight: height,
  },
  scrollView: {
    flexGrow: 1,
  },
  filtersWrapper: {
    marginBottom: 16,
  },
});
