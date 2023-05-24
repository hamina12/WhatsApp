import { View, Text } from 'react-native'
import React from 'react'

import styles from './styles'

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);

const Message = ({ message }) => {

  const isMyMessage = () => {
    return message.user.id === 'u1'
  }
  return (
    <View style={[
      styles.container,
      {
        backgroundColor: isMyMessage() ? '#DCF8C5':'white',
        alignSelf: isMyMessage() ? 'flex-end':'flex-start',
      }
      ]}
    >
      <Text>{message.text}</Text>
      <Text style={styles.time}>{dayjs(message.createdAt).fromNow()}</Text>
    </View>
  )
}

export default Message