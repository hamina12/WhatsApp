import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import Navigation from './src/components/Navigation';

export default function App() {
  return (
    <View style={styles.container}>
      <Navigation/>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
    justifyContent: 'center',

    paddingVertical: 50,
  },
});
