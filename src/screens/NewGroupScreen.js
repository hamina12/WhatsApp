import { View, Text, FlatList, TextInput, StyleSheet, Button } from 'react-native'
import React, { useEffect, useState } from 'react'

import ContactListItem from '../components/ContactListItem'

import { API, graphqlOperation, Auth } from 'aws-amplify'

import { listUsers } from '../graphql/queries'
import { useNavigation } from '@react-navigation/native'
import { createChatRoom, createUserChatRoom } from '../graphql/mutations';

const ContactsScreen = () => {
    const [users, setUsers] = useState([])
    const [selectedUserIds, setSelectedUserId] = useState([])
    const [name, setName] = useState("")

    const navigation = useNavigation()

    useEffect(() => {
        API.graphql(graphqlOperation(listUsers)).then((result)=>{
            setUsers(result.data?.listUsers?.items)
        })
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button title="Create" disabled={!name || selectedUserIds.length < 1} onPress={onCreateGroupPress} />
            ),
        })
    }, [name, selectedUserIds])

    const onCreateGroupPress = async () => {     
        // Create new ChatRoom
        const newChatRoomData = await API.graphql(
            graphqlOperation(createChatRoom, {input : {}})
        )
    
        if (!newChatRoomData.data?.createChatRoom) {
            console.log("Error creating the chat error")
        }
    
        const newChatRoom = newChatRoomData.data?.createChatRoom

        // Add clicked selected user to ChatRoom

        await Promise.all(selectedUserIds.map((userId) => 
                API.graphql(
                    graphqlOperation(createUserChatRoom, {
                        input : { chatRoomId: newChatRoom.id, userId}
                    })
                )
            )
        )
        

        // Add auth user to ChatRoom
        const authUser = await Auth.currentAuthenticatedUser()
        await API.graphql(
            graphqlOperation(createUserChatRoom, {
                input : { chatRoomId: newChatRoom.id, userId: authUser.attributes.sub }
            })
        )

        setSelectedUserId([])
        setName('')
        // navigate to the newly created
        navigation.navigate("Chat", {id: newChatRoom.id})
      }

    const onContactPress = (id) => {
        setSelectedUserId((userIds) => {
            if (userIds.includes(id)) {
                // Remove id from selected
                return [...userIds].filter(uid => uid !== id)
            } else {
                // Add id to selected
                return [...userIds, id]
            }
        })
    }

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='Group name'
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <FlatList
                data={users}
                renderItem={({item}) => (
                    <ContactListItem 
                        user={item} 
                        selectable 
                        onPress={()=> onContactPress(item.id)}
                        isSelected={selectedUserIds.includes(item.id)}
                    />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: "lightgray",
        padding: 10,
        margin: 10,
    },
})
export default ContactsScreen