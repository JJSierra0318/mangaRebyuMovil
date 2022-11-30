import axios from "axios"
import { useEffect, useState } from "react"
import { ScrollView, Text } from "react-native"
import { useParams } from "react-router-native"
import SingleMangaContainer from "./SingleMangaContainer"
import MangaReview from "../MangaReview.js/MangaReview"

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

    return (
        <ScrollView>
            <SingleMangaContainer manga={manga} categories={categories} id={id}/>
            <MangaReview id={id}/>
        </ScrollView>
        
    )
}

export default SingleManga