import { StyleSheet, Text, View } from "react-native"

const mangaStyles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        alignItems: 'stretch',
        width: 325,
        padding: 15,
        alignContent: 'center',
        backgroundColor: '#EFF7F6'
    }
})

const MangaItem = ({ manga }) => {

    return (
        <View style={mangaStyles.container}>
            <Text>{manga.title}</Text>
        </View>
    )

}

export default MangaItem