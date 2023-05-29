import { View, TextInput } from 'react-native'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { API, graphqlOperation, Auth } from 'aws-amplify'
import { createMessage, updateChatRoom } from '../../graphql/mutations'
import styles from './styles'

const InputBox = ({ chatroom }) => {

    // State data
    const [text, setText] = useState('')

    const onSend = async () => {
        const authUser = await Auth.currentAuthenticatedUser()

        const newMessage = {
            chatroomID: chatroom.id,
            text,
            userID: authUser.attributes.sub,
        }

        const newMessageData = await API.graphql(
            graphqlOperation(createMessage, {input : newMessage})
        )

        setText("");
        
        // set the new messages as LastMessage of the ChatRoom
        await API.graphql(graphqlOperation(
            updateChatRoom, { 
                input : {
                    _version: chatroom._version,
                    chatRoomLastMessageId: newMessageData.data.createMessage.id,
                    id: chatroom.id
                }
            })
        )
    }

    return (
        <SafeAreaView edges={['bottom']} style={styles.container}>
            {/* Icon */}
            <AntDesign name='plus' size={20} color='royalblue'/>
            {/* Text Input */}
            <TextInput 
                value={text} 
                onChangeText={setText} 
                style={styles.input} 
                placeholder='type your message....'
                multiline
            />
            {/* Icon */}
            <MaterialIcons onPress={onSend} style={styles.send} name='send' size={19} color='white'/>
        </SafeAreaView>
    )
}

export default InputBox