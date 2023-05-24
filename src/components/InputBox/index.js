import { View, TextInput } from 'react-native'
import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import styles from './styles'

const InputBox = () => {

    // State data
    const [newMessage, setNewMessage] = useState('')

    const onSend = () => {
        console.warn('sending a', newMessage)
    }

    return (
        <SafeAreaView edges={['bottom']} style={styles.container}>
            {/* Icon */}
            <AntDesign name='plus' size={20} color='royalblue'/>
            {/* Text Input */}
            <TextInput 
                value={newMessage} 
                onChangeText={setNewMessage} 
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