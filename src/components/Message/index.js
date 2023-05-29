import { View, Text } from 'react-native'
import { useEffect, useState } from 'react'

import styles from './styles'

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);

import { Auth } from 'aws-amplify';
const Message = ({ message }) => {
  const [isMe, setIsMe] = useState(false);

  useEffect (() => {
    const isMyMessage = async () => {
      const authUser = await Auth.currentAuthenticatedUser()
  
      setIsMe(message.userID === authUser.attributes.sub)
    }

    isMyMessage()
  }, [])

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: isMe ? '#DCF8C5':'white',
        alignSelf: isMe ? 'flex-end':'flex-start',
      }
      ]}
    >
      <Text>{message.text}</Text>
      <Text style={styles.time}>{dayjs(message.createdAt).fromNow()}</Text>
    </View>
  )
}

export default Message