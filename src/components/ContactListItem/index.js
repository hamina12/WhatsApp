import { Text, View, Image, Pressable } from 'react-native';
import styles from './styles';
import { AntDesign,FontAwesome } from '@expo/vector-icons'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);

const ContactListItem = ({ 
    user, onPress = () => {}, 
    selectable = false,
    isSelected = false 
}) => {

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
            { selectable && (
                isSelected ? (
                    <AntDesign name="checkcircle" size={24} color="royalblue" />
                ) : (
                    <FontAwesome name="circle-thin" size={24} color="lightgray" />
                )
            )}
        </Pressable>
    );
};

export default ContactListItem