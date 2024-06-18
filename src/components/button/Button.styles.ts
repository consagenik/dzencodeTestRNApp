import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#bacaed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineButton: {
    padding: 7,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#bacaed',
  },
  disabledButton: {
    padding: 8,
    borderWidth: 0,
    backgroundColor: '#e6ebf6',
  },
  buttonText: {
    color: '#fff',
  },
  outlineButtonText: {
    color: '#bacaed',
  },
  disabledButtonText: {
    color: '#343b59',
  },
});
