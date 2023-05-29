import { useEffect, useState } from 'react'
import { StyleSheet, FlatList, ImageBackground, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import { useRoute, useNavigation } from '@react-navigation/native'
import Message from '../components/Message'
import bg from '../../assets/images/BG.png'

import messages from '../../assets/data/messages.json'
import InputBox from '../components/InputBox'

import { API, graphqlOperation, Auth } from 'aws-amplify'
import { getChatRoom } from '../graphql/queries'

const ChatScreen = () => {
  const [chatRoom, setChatRoom] = useState(null)

  const route = useRoute()
  const navigation = useNavigation()

  const chatroomId = route.params.id

  useEffect(() => {
    API.graphql(graphqlOperation(getChatRoom, {id: chatroomId })).then(
      (result) => setChatRoom(result.data?.getChatRoom)
    )
  }, [])

  useEffect(() => {
    navigation.setOptions({ title: route.params.name })
  }, [route.params.name])

  if (!chatRoom) {
    return <ActivityIndicator />
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : ''} 
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      style={styles.bg}
    >
      <ImageBackground source={bg} style={styles.bg}>
        <FlatList 
          data = {chatRoom.Messages.items}
          renderItem={({item}) => <Message message={item}/>}
          style = {styles.list}
          inverted
        />
        <InputBox chatroom={chatRoom}/>
    </ImageBackground>
    </KeyboardAvoidingView>
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

