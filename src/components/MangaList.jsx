import { useEffect, useState } from "react"
import { View, Text, FlatList, Pressable } from "react-native"
import { useNavigate } from "react-router-native"
import axios from "axios"
import MangaItem from "./MangaItem"


const MangaList = () => {

    const navigate = useNavigate()

    const [mangas, setMangas] = useState([])
    const q = "a" //con mangakakalot q no puede ser de menos de 3 letras

    const getMangas = async (q) => {
        const {data} = await axios({
            method: 'GET',
            url: `https://kitsu.io/api/edge/manga?filter[text]=${q}`,
            headers: {
                "Accept": "application/vnd.api+json",
                "Content-Type": "application/vnd.api+json"
            }
        })

        setMangas(data.data)
    }

    useEffect(() => {
        getMangas(q)
    }, [])

    //if (!mangas) console.log("aaaaaaa");

    return (
        <FlatList
            data={mangas}
            renderItem={({ item }) => (
                <Pressable onPress={() => navigate(`manga/${item.id}`, { replace: true })}>
                    <MangaItem manga={item}/>
                </Pressable>
            )}
        />
    )
}

export default MangaList