import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flexDirection:'row',
        backgroundColor: 'whitesmoke',

        padding:5,
        paddingHorizontal:10,
        alignItems: 'center',
    },
    input: {
        flex:1,
        backgroundColor: 'white',

        padding:5,
        paddingHorizontal:10,
        marginHorizontal:10,

        borderRadius: 50,
        borderColor: 'lightgray',
        borderWidth: StyleSheet.hairlineWidth,
    },
    send: {
        backgroundColor: 'royalblue',
        padding:7,
        borderRadius:20,
        overflow:'hidden',
    },

})

export default styles