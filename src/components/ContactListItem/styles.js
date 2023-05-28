import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: { 
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 5,
        height: 60,
        alignItems: "center",
    },

    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 10,
    },

    content: {
        flex: 1,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'lightgray',
    },

    name: {
        fontWeight: 'bold',
    },

    subTitle: {
        color: 'gray',
    }

})

export default styles