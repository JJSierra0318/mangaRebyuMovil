import { Image, StyleSheet, Text, View } from "react-native"

const mangaStyles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        alignItems: 'stretch',
        width: 325,
        padding: 15,
        alignContent: 'center',
        backgroundColor: "#1C1C1C",
        //backgroundColor: '#240046',
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
        padding: 15,
        color: '#FFFFFF'
    }
})

const MangaItem = ({ manga }) => {

    //console.log(manga);

    return (
        <View style={mangaStyles.container}>
            <Image
                style={mangaStyles.image}
                source={{uri: manga.attributes.posterImage.original}}
            />
            <Text style={mangaStyles.title}>{manga.attributes.canonicalTitle}</Text>
        </View>
    )

}

export default MangaItem