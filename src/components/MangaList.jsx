import { useEffect, useState } from "react"
import { View, Text, FlatList } from "react-native"
import axios from "axios"
import MangaItem from "./MangaItem"


const MangaList = () => {

    const [mangas, setMangas] = useState([])
    const q = ""

    const getMangas = async (q) => {
        const {data} = await axios.get(`https://api.consumet.org/manga/mangadex/${q}?page=1`)
        setMangas(data.results.filter(manga => !manga.title.includes('Doujinshi')))
    }

    useEffect(() => {
        getMangas(q)
    }, [])

    //if (!mangas) console.log("aaaaaaa");

    return (
        <FlatList
            data={mangas}
            renderItem={({ item }) => (
                <MangaItem manga={item}/>
            )}
        />
    )
}

export default MangaList