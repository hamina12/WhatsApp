import { Text, View, Image, Pressable } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from 'react';

import { Auth } from 'aws-amplify'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);

const ChatListItem = ({ chat }) => {

    const navigation = useNavigation()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            const authUser = await Auth.currentAuthenticatedUser()
            const userItem = chat.users.items.find(item => item.user.id !== authUser.attributes.sub)
            setUser(userItem?.user)
        }

        fetchUser()
    }, [])

    // Loop through chat.users.items find a user that is not us
    

    return (
        <Pressable onPress={()=>navigation.navigate('Chat', { id: chat.id, name: user?.name })} style={styles.container}>
            <Image 
                source={{ uri: user?.image }}
                style={styles.image}
            />
            <View style={styles.content}>
                <View style={styles.row}>
                    <Text numberOfLines={1} style={styles.name}>{user?.name}</Text>
                    <Text style={styles.subTitle}>{dayjs(chat.LastMessage?.createdAt).fromNow()}</Text>
                </View>
                <Text numberOfLines={2} style={styles.subTitle}>{chat.LastMessage?.text}</Text>
            </View>
        </Pressable>
    );
};

export default ChatListItem