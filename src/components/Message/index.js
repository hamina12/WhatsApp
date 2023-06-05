import { View, Text, Image, Pressable, useWindowDimensions } from 'react-native'
import { useEffect, useState } from 'react'
import { S3Image } from 'aws-amplify-react-native'
import styles from './styles'

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime);

import { Auth, Storage } from 'aws-amplify';
import ImageView from 'react-native-image-viewing'

const Message = ({ message }) => {
  const [isMe, setIsMe] = useState(false);
  const [imageViewerVisible, setImageViewerVisible] = useState(false)
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

  }, [message.Attachments.items])

  const imageContainerWidth = width * 0.8 - 30

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
          {downloadAttachments.map((imageSource) => (
            <Pressable 
              style={[
                styles.imageContainer,
                downloadAttachments.length === 1 && { flex:1 },
              ]} 
              onPress={() => setImageViewerVisible(true)}
            >
              <Image source={{uri: imageSource.uri}} style={styles.image} />
            </Pressable>
          ))}
          <ImageView 
            images={downloadAttachments.map(({uri}) => ({uri}))}
            imageIndex={0} 
            visible={imageViewerVisible} 
            onRequestClose={()=> setImageViewerVisible(false)}
          />
        </View>
      )}

      <Text>{message.text}</Text>
      <Text style={styles.time}>{dayjs(message.createdAt).fromNow()}</Text>
    </View>
  )
}

export default Message