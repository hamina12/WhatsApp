import { View, Text, Image, Pressable, useWindowDimensions } from 'react-native'
import { useEffect, useState } from 'react'
import styles from './styles'

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);

import { Auth, Storage } from 'aws-amplify';

import ImageAttachements from './ImageAttachements';
import VideoAttachments from './VideoAttachments';

const Message = ({ message }) => {
  const [isMe, setIsMe] = useState(false);
  const [downloadAttachments, setDownloadedAttachments] = useState([])

  const { width } = useWindowDimensions()

  useEffect (() => {
    const isMyMessage = async () => {
      const authUser = await Auth.currentAuthenticatedUser()
  
      setIsMe(message.userID === authUser.attributes.sub)
    }

    isMyMessage()
  }, [])

  useEffect (() => {
    const downloadAttachments = async () => {
      if (message.Attachments.items) {
        const downloadedAttachments = await Promise.all(
          message.Attachments.items.map((attachment) =>
          Storage.get(attachment.storageKey).then((uri) => ({
            ...attachment,
            uri,
          }))
        )
      )
      setDownloadedAttachments(downloadedAttachments)

      }
    }

    downloadAttachments()

  }, [JSON.stringify(message.Attachments.items)])

  const imageContainerWidth = width * 0.8 - 30

  const imageAttachments = downloadAttachments.filter(at => at.type === 'IMAGE')
  const videoAttachments = downloadAttachments.filter(at => at.type === 'VIDEO')

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: isMe ? '#DCF8C5':'white',
        alignSelf: isMe ? 'flex-end':'flex-start',
      }
      ]}
    >
      { downloadAttachments.length > 0 && (
        <View style={[{ width: imageContainerWidth}, styles.images]}>
          <ImageAttachements attachments={imageAttachments}/>

          <VideoAttachments 
            attachments={videoAttachments} 
            width={imageContainerWidth}
          />
        </View>
      )}

      <Text>{message.text}</Text>
      <Text style={styles.time}>{dayjs(message.createdAt).fromNow()}</Text>
    </View>
  )
}

export default Message