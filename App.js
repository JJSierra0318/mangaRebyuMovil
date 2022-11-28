import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeRouter } from 'react-router-native';
import Main from './src/Main'
import { Provider } from "react-redux"
import { store } from './src/store';

export default function App() {
  return (
    <>
      <Provider store={store}>
        <NativeRouter>
          <Main />
        </NativeRouter>
        <StatusBar style='auto' />
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
