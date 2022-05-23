import { BaseButton, GoogleSignInButton, InverTedButton } from './button.style.jsx'

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted'
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => (
    {
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton,
        [BUTTON_TYPE_CLASSES.inverted]: InverTedButton,

    }[buttonType]

);




const Button = ({ children, buttonType, ...otherPropes }) => {
    const CustomButton = getButton(buttonType);
    return (
        <CustomButton  {...otherPropes}>
            {children}
        </CustomButton>

    )
}

export default Button;