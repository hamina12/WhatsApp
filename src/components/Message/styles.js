import { StyleSheet } from "react-native"

const styles = StyleSheet.create ({
    container: {
        margin: 5,
        padding: 10,
        borderRadius: 20,
        maxWidth: '80%',
        
        // SHADOW
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height:1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,

        elevation: 1,
    },

    time: {
        color: 'gray',
        alignSelf: 'flex-end',
    },
    image:{
        width: 200,
        height: 100,
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: 5,
    },
})

export default styles