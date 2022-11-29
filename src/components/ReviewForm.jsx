import { Formik } from 'formik'
import { useContext, useState } from 'react'
import { TouchableOpacity, View, StyleSheet, Image, Text, Pressable, TextInput } from 'react-native'
import * as yup from "yup"
import UserContext from '../contexts/userStorageContext'
import * as Device from "expo-device"
import axios from "axios"
import { useNavigate } from 'react-router-native'

const reviewStyle = StyleSheet.create({
    starBar: {
        flexDirection: "row",
        marginTop: 10
    },
    star: {
        width: 30,
        height: 30,
        resizeMode: "cover"
    },
    input: {
        marginTop: 20,
        marginBottom: 20,
        minHeight: 50,
        borderWidth: 1,
        padding: 5,
        paddingLeft: 10,
        color: "#A9ABB8",
        backgroundColor: "#3F4555",
        borderRadius: 10
    },
    submit: {
        backgroundColor: '#A9ABB8',
        borderRadius: 10,
        width: 100,
        height: 30,
        alignItems: "center"
    }
})

const validationSchema = yup.object().shape({
    comment: yup.string()
})

const initialValues = {
    comment: ""
}

const ReviewForm = ({ id }) => {

    const [rating, setRating] = useState(5)
    const maxRating = [1, 2, 3, 4, 5]
    const [user] = useContext(UserContext)
    const navigate = useNavigate()

    const filledStar = "https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png"
    const emptyStar = "https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png"

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
        <View style={reviewStyle.container}>
            <View style={reviewStyle.starBar}>
                {
                    maxRating.map(star => {
                        return (
                            <TouchableOpacity activeOpacity={0.7} key={star} onPress={() => setRating(star)}>
                                <Image style={reviewStyle.star} source={star <= rating ? {uri: filledStar} : {uri: emptyStar}}/>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {({ handleSubmit, handleChange, handleBlur, values }) => (
                    <View>
                        <TextInput
                            style={reviewStyle.input}
                            placeholder="Your comment"
                            onChangeText={handleChange('comment')}
                            name="comment"
                            value={values.comment}
                            onBlur={handleBlur('comment')}
                            multiline={true}
                        />
                        <Pressable style={reviewStyle.submit} onPress={handleSubmit}>
                            <Text style={{marginTop: 5}}>Submit</Text>
                        </Pressable>
                    </View>
                )}
            </Formik>
        </View>
    )
}

export default ReviewForm