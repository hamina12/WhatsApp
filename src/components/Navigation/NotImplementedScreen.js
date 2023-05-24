import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const NotImplementedScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>NotImplementedScreen</Text>
      <Image 
        source={{
            uri: 'https://scontent.fbkk6-2.fna.fbcdn.net/v/t39.30808-1/290952507_111475644944798_8696868478711896663_n.jpg?stp=dst-jpg_p320x320&_nc_cat=107&ccb=1-7&_nc_sid=c6021c&_nc_eui2=AeH35KDLAeKMmW8diAIsK-CPKyvczTyylFMrK9zNPLKUUwSBXOpxG6Ep96qDMssBFMA&_nc_ohc=a7hsIrz40V4AX8qBb1w&_nc_ht=scontent.fbkk6-2.fna&oh=00_AfDC3a5BXtcQMqEQYSSzjRGxPa6x_1v5WyeP7fZTmmo5zQ&oe=64730FF1'
        }}
        style={styles.image}
        resizeMode='contain'
      />
    </View>
  )
}

export default NotImplementedScreen

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize:18,
        fontWeight: '500',
        color: 'gray',
    },
    image: {
        width: '80%',
        aspectRatio: 2/1,
    },
})