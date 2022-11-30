import { Image, StyleSheet, Text, View } from "react-native"

const mangaStyle = StyleSheet.create({
    container: {
        backgroundColor: "#1C1C1C",
        width: 350,
        alignSelf: 'center',
        borderRadius: 20,
        alignItems: 'center',
        padding: 25,
    },
    image: {
        width: 250,
        height: 250,
        borderRadius: 10
    },
    title: {
        color: "#FFFFFF",
        marginTop: 30,
        fontSize: 25
    },
    description: {
        textAlign: "justify",
        color: "#A9ABB8",
        marginTop: 15
    },
    subtitle: {
        color: "#FFFFFF",
        alignSelf: "stretch",
        marginTop: 15,
    }
})

const statusStyle = StyleSheet.create({
    green: {
        color: "#3DA967"
    },
    blue: {
        color: "#5781F5"
    },
    yellow: {
        color: "#B2705F"
    },
    red: {
        color: "#FE0100"
    }
})

const SingleMangaContainer = ({ manga, categories, id }) => {

    const status = manga.attributes.status
    const rating = manga.attributes.averageRating
    const ageRating = manga.attributes.ageRating

    return (
        <>
            <View style={mangaStyle.container} testID="singleMangaItem">
                <Image
                    style={mangaStyle.image}
                    source={{ uri: manga.attributes.posterImage.original }}
                />
                <Text style={mangaStyle.title}>{manga.attributes.canonicalTitle}</Text>
                <Text style={mangaStyle.description}>{manga.attributes.synopsis}</Text>
                <Text style={mangaStyle.subtitle}>Average rating:
                    <Text style={rating >= 60 ? statusStyle.green : rating >= 30 ? statusStyle.yellow : statusStyle.red}> {rating ? rating : "???"}</Text>
                </Text>
                <Text style={mangaStyle.subtitle}>Status:
                    <Text style={status == "finished" ? statusStyle.green : status == "current" ? statusStyle.blue : statusStyle.yellow}> {status}</Text>
                </Text>
                <Text style={mangaStyle.subtitle}>Start date:
                    <Text style={{ color: "#A9ABB8" }}> {manga.attributes.startDate}</Text>
                </Text>
                <Text style={mangaStyle.subtitle}>Last updated:
                    <Text style={{ color: "#A9ABB8" }}> {manga.attributes.updatedAt.substring(0, 10)}</Text>
                </Text>
                <Text style={mangaStyle.subtitle}>Age rating:
                    <Text style={ageRating == "R18" ? statusStyle.red : { color: "#A9ABB8" }}> {ageRating ? ageRating : "???"}</Text>
                </Text>
                <Text style={mangaStyle.subtitle}>Categories:
                    <Text style={{ color: "#A9ABB8" }}> / {categories.map(category => category.attributes.name + " / ")}</Text>
                </Text>
            </View>
        </>
    )
}

export default SingleMangaContainer