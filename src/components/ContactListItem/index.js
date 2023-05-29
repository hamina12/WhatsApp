import { Text, View, Image, Pressable } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { API, graphqlOperation, Auth } from 'aws-amplify';
import { createChatRoom, createUserChatRoom } from '../../graphql/mutations';
import getCommonChatRoomsWithUser from '../../services/chatRoomService';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);

const ContactListItem = ({ user }) => {

    const navigation = useNavigation()

    const onPress = async () => {
        // Check if we already have a ChatRoom with user

        const existingChatRoom = await getCommonChatRoomsWithUser(user.id)
        if (existingChatRoom) {
            navigation.navigate("Chat", {id :existingChatRoom.id})
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
        <Pressable onPress={onPress} style={styles.container}>
            <Image 
                source={{ uri: user.image }}
                style={styles.image}
            />

            <View style={styles.content}>
                <Text numberOfLines={1} style={styles.name}>
                    {user.name}
                </Text>

                <Text numberOfLines={2} style={styles.subTitle}>
                    {user.status}
                </Text>
            </View>
        </Pressable>
    );
};

export default ContactListItem