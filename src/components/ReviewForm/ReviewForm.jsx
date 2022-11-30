import { useContext, useState } from 'react'
import UserContext from '../../contexts/userStorageContext'
import * as Device from "expo-device"
import axios from "axios"
import { useNavigate } from 'react-router-native'
import ReviewFormContainer from './ReviewFormContainer'

const ReviewForm = ({ id }) => {

    const [rating, setRating] = useState(5)
    const [user] = useContext(UserContext)
    const navigate = useNavigate()

    const postReview = async (user, id, rating, comment) => {
        const url = Device.osName == "Windows" ? "http://localhost:5142/api/createRegisterMovil" : "https://bccc-2800-e2-8880-1c2f-955c-1201-b28b-4c1b.ngrok.io/api/createRegisterMovil"
        const body = {
            username: user,
            idManga: id,
            rating: rating,
            coment: comment
        }

        const { data } = await axios.post(url, body)
        return data.result
    }

    const onSubmit = async ({ comment }) => {
        await postReview(user, id, rating, comment)
        navigate(`/refresh/${id}`, { replace: true })
    }

    return (
        <ReviewFormContainer user={user} rating={rating} setRating={setRating} onSubmit={onSubmit} />
    )
}

export default ReviewForm