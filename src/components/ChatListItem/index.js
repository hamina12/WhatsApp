import { Text, View, Image, Pressable } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';

import { Auth, API, graphqlOperation } from 'aws-amplify'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);

import { onUpdateChatRoom } from '../../graphql/subscriptions';

const ChatListItem = ({ chat }) => {

    const navigation = useNavigation()
    const [user, setUser] = useState(null)
    const [chatRoom, setChatRoom] = useState(chat)

    useEffect(() => {
        const fetchUser = async () => {
            const authUser = await Auth.currentAuthenticatedUser()
            const userItem = chatRoom.users.items.find(item => item.user.id !== authUser.attributes.sub)
            setUser(userItem?.user)
        }

        fetchUser()
    }, [])

    // fetch Chat Room
    useEffect(() => {
        const subscription = API.graphql(graphqlOperation(onUpdateChatRoom, {
        filter: { id: { eq : chat.id }}
        })
        ).subscribe({
        next: ({ value }) => {
            setChatRoom(cr => ({
            ...(cr || {}), 
            ...value.data.onUpdateChatRoom})
        )},
        error: (err) => console.warn(err)
        })
    
        return () => subscription.unsubscribe()
    }, [chat.id])
    

    return (
        <Pressable onPress={()=>navigation.navigate('Chat', { id: chatRoom.id, name: user?.name })} style={styles.container}>
            <Image 
                source={{ uri: user?.image }}
                style={styles.image}
            />
            <View style={styles.content}>
                <View style={styles.row}>
                    <Text numberOfLines={1} style={styles.name}>
                        {chatRoom.name || user?.name}
                    </Text>

                    {chatRoom.LastMessage && (<Text style={styles.subTitle}>
                        {dayjs(chatRoom.LastMessage?.createdAt).fromNow()}
                    </Text>
                    )}
                </View>
                <Text numberOfLines={2} style={styles.subTitle}>
                    {chatRoom.LastMessage?.text}
                </Text>
            </View>
        </Pressable>
    );
};

export default ChatListItem