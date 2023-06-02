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
  const [imageSources, setImageSources] = useState([])
  const [imageViewerVisible, setImageViewerVisible] = useState(false)
  const { width } = useWindowDimensions()
  useEffect (() => {
    const isMyMessage = async () => {
      const authUser = await Auth.currentAuthenticatedUser()
  
      setIsMe(message.userID === authUser.attributes.sub)
    }

    isMyMessage()
  }, [])

  useEffect (() => {
    const downloadImages = async () => {
      if (message.images?.length > 0) {
        const uris = await Promise.all(message.images.map(Storage.get))
        setImageSources(uris.map((uri) => ({ uri })))
      }
    }

    downloadImages()

  }, [message.images])

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
      { imageSources.length > 0 && (
        <View style={[{ width: imageContainerWidth}, styles.images]}>
          {imageSources.map(imageSource => (
            <Pressable 
              style={[
                styles.imageContainer,
                imageSources.length === 1 && { flex:1 },
              ]} 
              onPress={() => setImageViewerVisible(true)}
            >
              <Image source={imageSource} style={styles.image} />
            </Pressable>
          ))}
          <ImageView 
            images={imageSources} 
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