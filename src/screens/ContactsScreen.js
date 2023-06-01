import { useState, useEffect } from 'react'
import { Text, FlatList, Pressable } from 'react-native'

import ContactListItem from '../components/ContactListItem'

import { API, graphqlOperation, Auth } from 'aws-amplify'
import { listUsers } from '../graphql/queries'

import { MaterialIcons } from "@expo/vector-icons"
import { useNavigation } from '@react-navigation/native'

import { createChatRoom, createUserChatRoom } from '../graphql/mutations';
import getCommonChatRoomsWithUser from '../services/chatRoomService';


const ContactsScreen = () => {
  const [users, setUsers] = useState([])
  
  const navigation = useNavigation()
  
  useEffect(()=>{
    API.graphql(graphqlOperation(listUsers)).then((result) =>{
      setUsers(result.data?.listUsers?.items)
    })
  }, [])

  const createAChatRoomWithTheUser = async (user) => {
    // Check if we already have a ChatRoom with user
    const existingChatRoom = await getCommonChatRoomsWithUser(user.id)
    if (existingChatRoom) {
        navigation.navigate("Chat", {id :existingChatRoom.chatRoom.id})
        return
    }
    // Create new ChatRoom
    const newChatRoomData = await API.graphql(
        graphqlOperation(createChatRoom, {input : {}})
    )

    if (!newChatRoomData.data?.createChatRoom) {
        console.log("Error creating the chat error")
    }

    const newChatRoom = newChatRoomData.data?.createChatRoom
    // Add clicked user to ChatRoom
    await API.graphql(
        graphqlOperation(createUserChatRoom, {
            input : { chatRoomId: newChatRoom.id, userId: user.id }
        })
    )
    // Add auth user to ChatRoom
    const authUser = await Auth.currentAuthenticatedUser()
    await API.graphql(
        graphqlOperation(createUserChatRoom, {
            input : { chatRoomId: newChatRoom.id, userId: authUser.attributes.sub }
        })
    )
    // navigate to the newly created
    navigation.navigate("Chat", {id: newChatRoom.id})
  }

  return (
    < FlatList 
      data = {users} 
      renderItem={({item}) => (
        <ContactListItem 
          user={item} 
          onPress={() => createAChatRoomWithTheUser(item)}
        />
      )}
      style={{ backgroundColor: 'white'}} 
      ListHeaderComponent={() => (
        <Pressable
          onPress={()=>{
            navigation.navigate("New Group")
          }}
          style={{
            flexDirection:"row",
            alignItems: "center",
            padding: 15,
            paddingHorizontal: 20,
          }}
        >
        <MaterialIcons
          name="group"
          size={24}
          color="royalblue"
          style={{
            marginRight: 20,
            backgroundColor: "gainsboro",
            padding: 7,
            borderRadius: 20,
            overflow: "hidden",
          }}
        />
        <Text style={{color:"royalblue",fontSize:16}}>New Group</Text>
        </Pressable>
        )
      }
    />
  )
}

export default ContactsScreen
