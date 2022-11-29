import { render, fireEvent, waitFor } from "@testing-library/react-native"
import LogInContainer from "../../components/Login/LogInContainer"

describe("Login", () => {
    describe("LoginContainer", () => {
        it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
            
            const onSubmit = jest.fn()

            const { getByTestId } = render(<LogInContainer onSubmit={onSubmit} />)

            fireEvent.changeText(getByTestId("usernameField"), "Sierra")
            fireEvent.changeText(getByTestId("passwordField"), "password")
            fireEvent.press(getByTestId("logInButton"))

            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(1)

                expect(onSubmit.mock.calls[0][0]).toEqual({
                    username: "Sierra",
                    password: "password"
                })
            })
        })
        it("does not call onSubmit function when an invalid username is submitted", async () => {

            const onSubmit = jest.fn()

            const { getByTestId } = render(<LogInContainer onSubmit={onSubmit} />)

            fireEvent.changeText(getByTestId("usernameField"), "")
            fireEvent.changeText(getByTestId("passwordField"), "password")
            fireEvent.press(getByTestId("logInButton"))

            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(0)
            })
        })

        it("does not call onSubmit function when an invalid password is submitted", async () => {

            const onSubmit = jest.fn()

            const { getByTestId } = render(<LogInContainer onSubmit={onSubmit} />)

            fireEvent.changeText(getByTestId("usernameField"), "Sierra")
            fireEvent.changeText(getByTestId("passwordField"), "")
            fireEvent.press(getByTestId("logInButton"))

            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(0)
            })
        })
    })
})