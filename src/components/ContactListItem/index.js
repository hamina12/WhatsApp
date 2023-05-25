import { Text, View, Image, Pressable } from 'react-native';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);

const ContactListItem = ({ user }) => {

    const navigation = useNavigation()

    return (
        <Pressable onPress={() => {}} style={styles.container}>
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