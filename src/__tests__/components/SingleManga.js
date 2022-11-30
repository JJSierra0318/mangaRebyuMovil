import { render } from "@testing-library/react-native"
import SingleMangaContainer from "../../components/SingleManga/SingleMangaContainer"

describe("SingleManga", () => {
    describe("SingleMangaContainer", () => {

        const mockManga = {
            attributes: {
                status: "current",
                averageRating: 75,
                ageRating: "R",
                posterImage: {
                    original: ""
                },
                canonicalTitle: "Attack on Titan",
                synopsis: "A long long time ago...",
                startDate: "2017-06-01",
                updatedAt: "2020-11-30"
            }
        }

        const mockCategories = [{
            attributes: {
                name: "Action"
            }
        },
        {
            attributes: {
                name: "Comedy"
            }
        }]

        const mockId = 1

        it("Renders correctly when given valid manga, categories and id", () => {

            const { getByTestId } = render(<SingleMangaContainer manga={mockManga} categories={mockCategories} id={mockId} />)

            const singleManga = getByTestId("singleMangaItem")

            expect(singleManga).toHaveTextContent("current")
            expect(singleManga).toHaveTextContent("75")
            expect(singleManga).toHaveTextContent("R")
            expect(singleManga).toHaveTextContent("Attack on Titan")
            expect(singleManga).toHaveTextContent("A long long time ago...")
            expect(singleManga).toHaveTextContent("2017-06-01")
            expect(singleManga).toHaveTextContent("2020-11-30")
            expect(singleManga).toHaveTextContent("/ Action / Comedy /")
        })
    })
})