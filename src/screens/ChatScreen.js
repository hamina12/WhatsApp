import { useEffect } from 'react'
import { StyleSheet, FlatList, ImageBackground, KeyboardAvoidingView } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import Message from '../components/Message'
import bg from '../../assets/images/BG.png'

import messages from '../../assets/data/messages.json'
import InputBox from '../components/InputBox'

const ChatScreen = () => {

  const route = useRoute()
  const navigation = useNavigation()

  useEffect(() => {
    navigation.setOptions({ title: route.params.name })
  }, [route.params.name])

  return (
    //<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ImageBackground source={bg} style={styles.bg}>
        <FlatList 
          data = {messages}
          renderItem={({item}) => <Message message={item}/>}
          style = {styles.list}
          inverted
        />
        <InputBox />
    </ImageBackground>
    //</KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    bg: {
        flex:1,
    },
    list: {
        padding:10,
    },
})

export default ChatScreen

