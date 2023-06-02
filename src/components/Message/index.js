import { View, Text, Image, Pressable } from 'react-native'
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
        const uri = await Storage.get(message.images[0])
        setImageSources([{ uri }])
      }
    }

    downloadImages()

  }, [message.images])

  return (
    <View style={[
      styles.container,
      {
        backgroundColor: isMe ? '#DCF8C5':'white',
        alignSelf: isMe ? 'flex-end':'flex-start',
      }
      ]}
    >
      { message.images?.length > 0 && (
        <>
          <Pressable onPress={() => setImageViewerVisible(true)}>
            <Image source={imageSources[0]} style={styles.image} />
          </Pressable>

          <ImageView 
            images={imageSources} 
            imageIndex={0} 
            visible={imageViewerVisible} 
            onRequestClose={()=> setImageViewerVisible(false)}
          />
        </>
      )}

      <Text>{message.text}</Text>
      <Text style={styles.time}>{dayjs(message.createdAt).fromNow()}</Text>
    </View>
  )
}

export default Message