import { render, fireEvent, waitFor } from "@testing-library/react-native"
import ReviewFormContainer from "../../components/ReviewForm/ReviewFormContainer"

describe("ReviewForm", () => {
    describe("ReviewFormContainer", () => {
        it("calls onSubmit when a valid form is submitted", async () => {

            const onSubmit = jest.fn()
            const setRating = jest.fn()

            const { getByTestId } = render(<ReviewFormContainer user="Sierra" rating={4} setRating={setRating} onSubmit={onSubmit} />)

            fireEvent.press(getByTestId("reviewFormButton"))

            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(1)

                expect(onSubmit.mock.calls[0][0]).toEqual({
                    comment: ""
                })
            })
        })
        it("displays correct message if the user is not logged in", async () => {

            const onSubmit = jest.fn()
            const setRating = jest.fn()

            const { getByTestId } = render(<ReviewFormContainer user="" rating={4} setRating={setRating} onSubmit={onSubmit} />)
            const reviewFom = getByTestId("reviewFormContainer")
            expect(reviewFom).toHaveTextContent("You have to be logged in to make a review")
        })
    })
})