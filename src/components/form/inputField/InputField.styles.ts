import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  inputFieldWrapper: {
    marginBottom: 8,
  },
  label: {
    marginBottom: 4,
    color: '#595959',
  },
  inputField: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: '#f3f6fb',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 4,
  },
  errorWrapper: {
    height: 16,
  },
  error: {
    color: '#fa3333',
    fontSize: 10,
  },
});
