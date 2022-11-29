import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-native"
import MangaListContainer from "./MangaListContainer"

const MangaList = () => {

    const [mangas, setMangas] = useState([])
    const [filterBy, setFilterBy] = useState("")
    const navigate = useNavigate()

    const getMangas = async (q) => {
        const url = filterBy && filterBy.trim() != "" ? `https://kitsu.io/api/edge/manga?filter[text]=${q}` : `https://kitsu.io/api/edge/trending/manga`
        const {data} = await axios({
            method: 'GET',
            url,
            headers: {
                "Accept": "application/vnd.api+json",
                "Content-Type": "application/vnd.api+json"
            }
        })
        setMangas(data.data)
    }

    useEffect(() => {
        getMangas(filterBy)
    }, [filterBy])

    const onSearch = (id) => {
        navigate(`manga/${id}`, { replace: true })
    }

    if (!mangas[0]) return null

    return (
        <MangaListContainer mangas={mangas} filterBy={filterBy} setFilterBy={setFilterBy} onSearch={onSearch}/>
    )
}

export default MangaList