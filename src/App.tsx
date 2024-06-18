import React from 'react';
import {Provider} from 'react-redux';
import {store} from './state/store';
import MainScreen from './screens/mainScreen/MainScreen';

// const persistor = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <MainScreen />
    </Provider>
  );
};

export default App;
