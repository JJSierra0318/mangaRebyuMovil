import { render, fireEvent, waitFor } from "@testing-library/react-native"
import SignUpContainer from "../../components/Signup/SignUpContainer"

describe("SignUo", () => {
    describe("SignUpContainer", () => {
        it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
            const onSubmit = jest.fn()

            const { getByTestId } = render(<SignUpContainer onSubmit={onSubmit}/>)

            fireEvent.changeText(getByTestId("usernameField"), "Sierra")
            fireEvent.changeText(getByTestId("passwordField"), "password")
            fireEvent.changeText(getByTestId("confirmPasswordField"), "password")
            fireEvent.press(getByTestId("signUpButton"))

            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(1)

                expect(onSubmit.mock.calls[0][0]).toEqual({
                    username: "Sierra",
                    password: "password",
                    confirmPassword: "password"
                })
            })
        })
        it("does not call onSubmit function when an invalid username is submitted", async () => {
            const onSubmit = jest.fn()

            const { getByTestId } = render(<SignUpContainer onSubmit={onSubmit}/>)

            fireEvent.changeText(getByTestId("usernameField"), "")
            fireEvent.changeText(getByTestId("passwordField"), "password")
            fireEvent.changeText(getByTestId("confirmPasswordField"), "password")
            fireEvent.press(getByTestId("signUpButton"))

            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(0)
            })
        })
        it("does no call onSubmit function when an invalid password is submitted", async () => {
            const onSubmit = jest.fn()

            const { getByTestId } = render(<SignUpContainer onSubmit={onSubmit}/>)

            fireEvent.changeText(getByTestId("usernameField"), "Sierra")
            fireEvent.changeText(getByTestId("passwordField"), "")
            fireEvent.changeText(getByTestId("confirmPasswordField"), "")
            fireEvent.press(getByTestId("signUpButton"))

            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(0)
            })
        })
        it("does no call onSubmit function when password and confirmPassword do not match", async () => {
            const onSubmit = jest.fn()

            const { getByTestId } = render(<SignUpContainer onSubmit={onSubmit}/>)

            fireEvent.changeText(getByTestId("usernameField"), "Sierra")
            fireEvent.changeText(getByTestId("passwordField"), "password1")
            fireEvent.changeText(getByTestId("confirmPasswordField"), "password2")
            fireEvent.press(getByTestId("signUpButton"))

            await waitFor(() => {
                expect(onSubmit).toHaveBeenCalledTimes(0)
            })
        })
    })
})