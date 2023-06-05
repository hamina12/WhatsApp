import { Pressable, Image } from 'react-native'
import ImageView from 'react-native-image-viewing'

import styles from './styles'

import { useState } from 'react'

const ImageAttachements = ({attachments}) => {
    const [imageViewerVisible, setImageViewerVisible] = useState(false)
    return (  
        <>
            {attachments.map((attachment) => (
                <Pressable
                    key={attachment.id} 
                    style={[
                        styles.imageContainer,
                        attachments.length === 1 && { flex:1 },
                    ]} 
                    onPress={() => setImageViewerVisible(true)}
                >
                    <Image source={{uri: attachment.uri}} style={styles.image} />
                </Pressable>
            ))}

            <ImageView 
                    images={attachments.map(({uri}) => ({uri}))}
                    imageIndex={0} 
                    visible={imageViewerVisible} 
                    onRequestClose={()=> setImageViewerVisible(false)}
            />
        </>
    )
}

export default ImageAttachements