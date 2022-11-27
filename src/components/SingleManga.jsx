import axios from "axios"
import { useEffect, useState } from "react"
import { Image, ScrollView, StyleSheet, Text, View } from "react-native"
import { useParams } from "react-router-native"

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

const SingleManga = () => {

    const [manga, setManga] = useState([])
    const [categories, setCategories] = useState([])
    const id = useParams().id

    const getManga = async (id) => {
        const { data } = await axios({
            method: 'GET',
            url: `https://kitsu.io/api/edge/manga/${id}`,
            headers: {
                "Accept": "application/vnd.api+json",
                "Content-Type": "application/vnd.api+json"
            }
        })
        setManga(data.data)
    }

    const getCategories = async (id) => {
        const { data } = await axios({
            method: 'GET',
            url: `https://kitsu.io/api/edge/manga/${id}/genres`,
            headers: {
                "Accept": "application/vnd.api+json",
                "Content-Type": "application/vnd.api+json"
            }
        })
        setCategories(data.data)
    }

    useEffect(() => {
        getManga(id)
        getCategories(id)
    }, [])

    if (!manga.attributes) return <Text>Loading</Text>
    const status = manga.attributes.status
    const rating = manga.attributes.averageRating
    const ageRating = manga.attributes.ageRating

    return (
        <ScrollView>
            <View style={mangaStyle.container}>
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
        </ScrollView>
    )
}

export default SingleManga