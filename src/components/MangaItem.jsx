import { Image, StyleSheet, Text, View } from "react-native"

const mangaStyles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        alignItems: 'stretch',
        width: 325,
        padding: 15,
        alignContent: 'center',
        backgroundColor: '#EFF7F6',
        borderRadius: 10,
        margin: 10,
        flexDirection: 'row'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 10
    },
    title: {
        fontSize: 17,
        padding: 15
    }
})

const MangaItem = ({ manga }) => {

    console.log(manga);

    return (
        <View style={mangaStyles.container}>
            <Image
                style={mangaStyles.image}
                source={{uri: manga.image}}
            />
            <Text style={mangaStyles.title}>{manga.title}</Text>
        </View>
    )

}

export default MangaItem