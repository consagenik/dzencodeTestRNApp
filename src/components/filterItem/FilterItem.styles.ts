import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  filterItem: {
    flexDirection: 'row',
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#e6ebf6',
    marginRight: 8,
  },
  activeFilter: {
    backgroundColor: '#bacaed',
  },
  filterText: {
    marginRight: 4,
    fontSize: 16,
    color: 'black',
  },
  activeFilterText: {
    color: '#fff',
  },
  filterVariant: {
    fontSize: 16,
    color: 'black',
  },
  filterFIFOVariant: {
    transform: [{rotate: '90deg'}],
    color: '#fff',
  },
  filterLIFOVariant: {
    transform: [{rotate: '270deg'}],
    color: '#fff',
  },
});
