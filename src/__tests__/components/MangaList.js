import { render, fireEvent, waitFor, screen } from "@testing-library/react-native"
import MangaListContainer from "../../components/MangaList/MangaListContainer"

describe("MangaList", () => {
    describe("MangaListContainer", () => {

        const mockManga = [{
            attributes: {
                posterImage: {
                    original: ""
                },
                canonicalTitle: "Manga1"
            }
        }]

        const mockMangas = [{
            attributes: {
                posterImage: {
                    original: ""
                },
                canonicalTitle: "Manga1"
            }
        },
        {
            attributes: {
                posterImage: {
                    original: ""
                },
                canonicalTitle: "Manga2"
            }
        }]

        it("Renders the correct amount of mangas from the recieved list", async () => {

            render(<MangaListContainer mangas={mockMangas} />)
            const mangaList = await waitFor(() => screen.findAllByTestId("singleMangaContainer"))
            expect(mangaList).toHaveLength(2)
        })

        it("Calls onSearch when a manga in the list is pressed", async () => {

            const onSearch = jest.fn()

            const { getByTestId } = render(<MangaListContainer mangas={mockManga} onSearch={onSearch} />)

            fireEvent.press(getByTestId("singleMangaContainer"))

            await waitFor(() => {
                expect(onSearch).toHaveBeenCalledTimes(1)
            })
        })
    })
})