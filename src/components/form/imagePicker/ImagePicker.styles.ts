import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  filePicker: {},
  label: {
    marginBottom: 4,
    color: '#595959',
  },
  selectAvatarWrapper: {
    flexDirection: 'row',
  },
  selectAvatar: {
    width: 160,
    height: 160,
    backgroundColor: '#f3f6fb',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  avatar: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imagePlaceholder: {
    color: '#bacaed',
    fontWeight: '600',
    fontSize: 100,
  },
  description: {
    flex: 1,
    height: '100%',
  },
  selectAvatarTitle: {
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 17,
    color: '#454545',
    marginTop: 22,
    marginBottom: 27,
  },
  availableFormats: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  availableFormatsDescription: {
    fontSize: 14,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 8,
  },
  formats: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  format: {
    height: 20,
    paddingHorizontal: 6,
    margin: 8,
    backgroundColor: '#f3f6fb',
    borderRadius: 3,
  },
  formatText: {
    fontSize: 14,
    color: '#8f8f8f',
  },
  errorWrapper: {
    height: 16,
  },
});
