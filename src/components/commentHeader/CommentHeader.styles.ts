import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  header: {
    height: 48,
    paddingHorizontal: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e6ebf6',
  },
  avatarWrapper: {
    width: 32,
    height: 32,
    marginRight: 12,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
  },
  avatar: {
    width: 32,
    height: 32,
    objectFit: 'cover',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'black',
    marginRight: 8,
  },
  date: {
    fontSize: 14,
    color: '#343b59',
  },
});
