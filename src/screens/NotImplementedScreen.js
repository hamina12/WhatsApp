import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const NotImplementedScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Not Implemented Screen</Text>
      <Image 
        source={{
            uri: 'https://scontent.fbkk6-2.fna.fbcdn.net/v/t1.6435-9/65128833_2421289494821629_294122577360584704_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=9267fe&_nc_eui2=AeG6eXbt5IuWa5cQsCA5DJG6rrm2HYwZ7-yuubYdjBnv7HFyZ6ZaosCw-phFEnZBd1k&_nc_ohc=ja35uJzjlXMAX_SdKcm&_nc_ht=scontent.fbkk6-2.fna&oh=00_AfAD7uAQGZ2miURon5KbLxnmrPPf3XGSKVl6_bduptuxEQ&oe=649654CE'
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
        maxWidth: 200,
        height:200,
        aspectRatio: 2/1,
        borderRadius: 100,
    },
})