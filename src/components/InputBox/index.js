import { View, TextInput, Image } from 'react-native'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { API, graphqlOperation, Auth, Storage } from 'aws-amplify'
import { createMessage, updateChatRoom } from '../../graphql/mutations'
import * as ImagePicker from 'expo-image-picker'
import styles from './styles'

import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'

const InputBox = ({ chatroom }) => {

    // State data
    const [text, setText] = useState('')
    const [image, setImage] = useState(null)

    const onSend = async () => {
        const authUser = await Auth.currentAuthenticatedUser()

        const newMessage = {
            chatroomID: chatroom.id,
            text,
            userID: authUser.attributes.sub,
        }

        if (image) {
            newMessage.images = [await uploadFile(image)]
            setImage(null)
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

    const pickImage = async () => {
        // No permission request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1,
        })

        console.log(result)

        if (!result.canceled) {
            setImage(result.uri)
        }
    }

    const uploadFile = async (fileUri) => {
        try {
            const response = await fetch(fileUri)
            const blob = await response.blob()
            const key = `${uuidv4()}.png`

            await Storage.put(key, blob, {
                contentType: 'image/png',
            })
            return key
        } catch (err) {
            console.log("Error uploading file:", err)
        }
    }
    
    return (
        <>
            {image && (
                <View style={styles.attachmentsContainer}>
                    <Image 
                        source={{ uri: image }} 
                        style={styles.selectedImage} 
                        resizeMode='contain'
                    />
                    <MaterialIcons
                        name="highlight-remove"
                        onPress={()=> setImage(null)}
                        size={20}
                        color="gray"
                        style={styles.removeSelectedImage}
                    />
                </View>
            )}

            <SafeAreaView edges={['bottom']} style={styles.container}>
                {/* Icon */}
                <AntDesign onPress={pickImage} name='plus' size={20} color='royalblue'/>
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
        </>
    )
}

export default InputBox