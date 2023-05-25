import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

import { Amplify } from 'aws-amplify';
import awsconfig from "./src/aws-exports";
import { withAuthenticator } from 'aws-amplify-react-native';

import Navigation from './src/components/Navigation';

Amplify.configure({...awsconfig, Analytics: {disabled:true}})

function App() {
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

  },
});

export default withAuthenticator(App);
