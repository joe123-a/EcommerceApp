import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Navigator} from './src/Navigator';
import {StoreProvider} from './src/store';

function App() {
  return (
    <SafeAreaProvider>
      <StoreProvider>
        <Navigator />
      </StoreProvider>
    </SafeAreaProvider>
  );
}

export default App;
