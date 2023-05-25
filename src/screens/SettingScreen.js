import { StyleSheet, Text, View, Button } from 'react-native'

import { Auth } from 'aws-amplify'

const SettingScreen = () => {
  return (
    <View style={styles.container}>
      <Button onPress={() => Auth.signOut()} title="Sign Out"/>
    </View>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        width:'100%',
    }
})