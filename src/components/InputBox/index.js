import { View, TextInput, Image, FlatList, Text } from 'react-native'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { API, graphqlOperation, Auth, Storage} from 'aws-amplify'
import { createAttachment, createMessage, updateChatRoom } from '../../graphql/mutations'
import * as ImagePicker from 'expo-image-picker'
import styles from './styles'
import { SHA1 } from 'crypto-js';

const InputBox = ({ chatroom }) => {
    // State data
    const [text, setText] = useState('')
    const [files, setFiles] = useState([])
    const [progresses, setProgresses] = useState({})

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

        setText("")

        // create attachments
        await Promise.all(
            files.map((file) => 
                addAttachment(file, newMessageData.data.createMessage.id)
            )
        )
        setFiles([])

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

    const addAttachment = async (file, messageID) => {
        const types = {
            image:'IMAGE',
            video:'VIDEO',
        }

        const newAttachment = {
            storageKey: await uploadFile(file.uri),
            type: types[file.type], // TODO: VIDEO
            width: file.width,
            height: file.height,
            duration: file.duration,
            messageID,
            chatroomID: chatroom.id,
        }

        return API.graphql(
            graphqlOperation(createAttachment, {input : newAttachment}))
    }

    const pickImage = async () => {
        // No permission request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            quality: 1,
            allowsMultipleSelection: true,
        })
        if (!result.canceled) {
            if (result.assets) {
                // user selected multible files
                setFiles(result.assets)
                
            } else {
                setFiles([result])
            }
        }
    }

    const uploadFile = async (fileUri) => {
        try {
            const randomNumber = Math.random().toString();
            const key = SHA1(randomNumber) + '.png';
            const response = await fetch(fileUri)
            const blob = await response.blob()

            await Storage.put(key, blob, {
                contentType: 'image/png',
                progressCallback: (progress) => {
                    console.log(`Upload: ${ progress.loaded}/${progress.total}`)
                    setProgresses((p) => ({...p, [fileUri]: progress.loaded / progress.total}))
                }
            })

            return key
        } catch (error) {
            console.log('Error generating UUID:', error);
        }
      };

    
    return (
        <>
            {files.length > 0 && (
                <View style={styles.attachmentsContainer}>
                    <FlatList 
                        data={files}
                        horizontal
                        renderItem={({item}) => (
                            <>
                                <Image 
                                    source={{ uri: item.uri }} 
                                    style={styles.selectedImage} 
                                    resizeMode='contain'
                                />

                                {progresses[item.uri] && <View style={{ 
                                    position:'absolute',
                                    top:'50%', 
                                    left:'50%',

                                    }}>
                                    <Text style={{color:'white'}}>
                                        {(progresses[item.uri] * 100).toFixed(0)} %
                                    </Text>
                                </View>}

                                <MaterialIcons
                                    name="highlight-remove"
                                    onPress={()=> 
                                        setFiles((existingFiles) => existingFiles.filter((file) => file !== item))}
                                    size={20}
                                    color="gray"
                                    style={styles.removeSelectedImage}
                                />
                            </>
                        )}
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