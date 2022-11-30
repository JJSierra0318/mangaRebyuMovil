import { Formik } from 'formik'
import { TouchableOpacity, View, StyleSheet, Image, Text, Pressable, TextInput } from 'react-native'
import * as yup from "yup"

const reviewStyle = StyleSheet.create({
    container: {
        backgroundColor: "#2B2F3E",
        width: 350,
        alignSelf: 'center',
        borderRadius: 20,
        padding: 25,
        marginTop: 30
    },
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
    },
    disclaimer: {
        color: "#A9ABB8",
        alignItems: "center",
        alignSelf: "center",
        backgroundColor: "#2B2F3E",
        height: 80,
        borderRadius: 15,
        width: 300,
        textAlign: "center",
        textAlignVertical: "top"
    },
    user: {
        flexDirection: "row"
    },
    username: {
        color: "#FFFFFF",
        fontSize: 20,
        marginLeft: 10
    },
    userIcon: {
        width: 30,
        height: 30
    }
})

const validationSchema = yup.object().shape({
    comment: yup.string()
})

const initialValues = {
    comment: ""
}

export const ReviewFormContainer = ({ user, rating, setRating, onSubmit }) => {

    const maxRating = [1, 2, 3, 4, 5]

    const filledStar = "https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png"
    const emptyStar = "https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png"

    return (
        <View testID='reviewFormContainer'>
            {user
            ? <View style={reviewStyle.container}>
                <View style={reviewStyle.review}>
                    <View style={reviewStyle.user}>
                        <Image style={reviewStyle.userIcon} source={{ uri: "https://cdn-icons-png.flaticon.com/128/2102/2102633.png" }} />
                        <Text style={reviewStyle.username}>{user}{'\n'}</Text>
                    </View>
                </View>
                <View style={reviewStyle.starBar}>
                    {
                        maxRating.map(star => {
                            return (
                                <TouchableOpacity activeOpacity={0.7} key={star} onPress={() => setRating(star)}>
                                    <Image style={reviewStyle.star} source={star <= rating ? { uri: filledStar } : { uri: emptyStar }} />
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
                            <Pressable style={reviewStyle.submit} onPress={handleSubmit} testID="reviewFormButton">
                                <Text style={{ marginTop: 5 }}>Submit</Text>
                            </Pressable>
                        </View>
                    )}
                </Formik>
            </View>
            : <Text style={reviewStyle.disclaimer}>{'\n\nYou have to be logged in to make a review'}</Text>}
        </View>
    )
}

export default ReviewFormContainer