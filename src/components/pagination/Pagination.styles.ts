import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#c0c0f1',
  },
  button: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e6ebf6',
    borderRadius: 10,
    marginHorizontal: 4,
  },
  activeButton: {
    borderWidth: 1,
    borderColor: '#7575f1',
  },
  dots: {
    width: 32,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
