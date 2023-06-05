import { View, Text } from 'react-native'
import { Video } from 'expo-av';
import styles from './styles'
const VideoAttachments = ({ width, attachments }) => {
  return (
    <>
        {attachments.map((attachment) => (
            <Video 
                key={attachment.id}
                useNativeControls
                source={{
                    uri: attachment.uri,
                }}
                shouldPlay={false}
                style={{
                    width: width,
                    height: (attachment.height * width)/attachment.width,
                }}
                resizeMode='contain'
            />
        ))}
    </>
  )
}

export default VideoAttachments