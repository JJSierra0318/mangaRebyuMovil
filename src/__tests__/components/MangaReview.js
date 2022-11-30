import { render } from "@testing-library/react-native"
import MangaReviewContainer from "../../components/MangaReview.js/MangaReviewContainer"

describe("MangaReview", () => {
    describe("MangaReviewContainer", () => {

        const mockReviews = [
            [1, "Sierra", 5, "Bueno"],
            [2, "Beta", 1, "Malo"]
        ]

        const mockUser = "Sierra"

        it("Renders reviews correctly", async () => {

            const { getAllByTestId } = render(<MangaReviewContainer reviews={mockReviews} />)

            const reviewItems = getAllByTestId("singleReviewContainer")
            const [firstReview, secondReview] = reviewItems

            expect(firstReview).toHaveTextContent("Sierra")

            expect(secondReview).toHaveTextContent("Beta")
        })
        it("Renders the correct alert message if there are no reviews", async () => {

            const {getByTestId} = render(<MangaReviewContainer />)
            const reviewList = getByTestId("reviewContainer")
            expect(reviewList).toHaveTextContent("There are no reviews for this manga yet")
        })
    })
})