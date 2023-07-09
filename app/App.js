import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import Navigation from './navigation/Navigation';
import TodoContextProvider from './provider/todoContext';

function App() {
  return (
    <>
      <StatusBar style="auto" />
      <TodoContextProvider>
        <Navigation />
      </TodoContextProvider>
    </>
  );
}

export default App;
