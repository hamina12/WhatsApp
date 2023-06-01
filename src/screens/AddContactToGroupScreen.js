import { View, Text, FlatList, TextInput, StyleSheet, Button } from 'react-native'
import React, { useEffect, useState } from 'react'

import ContactListItem from '../components/ContactListItem'

import { API, graphqlOperation, Auth } from 'aws-amplify'

import { listUsers } from '../graphql/queries'
import { useNavigation, useRoute } from '@react-navigation/native'
import { createUserChatRoom } from '../graphql/mutations';

const AddContactToGroupScreen = () => {
    const [users, setUsers] = useState([])
    const [selectedUserIds, setSelectedUserId] = useState([])

    const navigation = useNavigation()
    const route = useRoute()
    const chatRoom = route.params.chatRoom
    useEffect(() => {
        API.graphql(graphqlOperation(listUsers)).then((result)=>{
            setUsers(
                result.data?.listUsers?.items.filter(
                    (item) => 
                        !chatRoom.users.items.some(
                            (chatRoomUser) => 
                                !chatRoomUser._deleted && item.id === chatRoomUser.userId
                        )
                )
            )
        })
    }, [])

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Button 
                    title="Add to group" 
                    disabled={selectedUserIds.length < 1} 
                    onPress={onAddToGroupPress} 
                />
            ),
        })
    }, [selectedUserIds])

    const onAddToGroupPress = async (chatroomID) => {     

        // Add clicked selected user to ChatRoom
        await Promise.all(selectedUserIds.map((userId) => 
                API.graphql(
                    graphqlOperation(createUserChatRoom, {
                        input : { chatRoomId: chatRoom.id, userId}
                    })
                )
            )
        )
        
        setSelectedUserId([])
        // navigate to the newly created
        navigation.goBack()
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
export default AddContactToGroupScreen