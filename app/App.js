import React from 'react';
import {StatusBar, StyleSheet} from 'react-native';
import Navigation from './navigation/Navigation';

function App() {
  return (
    <>
      <StatusBar style="auto" />
      <Navigation />
    </>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
