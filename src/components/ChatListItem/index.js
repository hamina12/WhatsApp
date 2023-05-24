import { Text, View, Image, Pressable } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);

const ChatListItem = ({ chat }) => {

    const navigation = useNavigation()

    return (
        <Pressable onPress={()=>navigation.navigate('Chat', { id: chat.id, name: chat.user.name })} style={styles.container}>
            <Image 
                source={{ uri: chat.user.image }}
                style={styles.image}
            />
            <View style={styles.content}>
                <View style={styles.row}>
                    <Text numberOfLines={1} style={styles.name}>{chat.user.name}</Text>
                    <Text style={styles.subTitle}>{dayjs(chat.lastMessage.createdAt).fromNow()}</Text>
                </View>
                <Text numberOfLines={2} style={styles.subTitle}>{chat.lastMessage.text}</Text>
            </View>
        </Pressable>
    );
};

export default ChatListItem