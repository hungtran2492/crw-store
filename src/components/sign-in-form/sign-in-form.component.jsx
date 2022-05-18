import { signInWithGooglePopup, signInWithGoogleRedirect, signInAuthUserWithEmailAndPassWord, createUserDocumentFromAuth, auth } from '../../ultils/firebase/firebase.utils'
import './sign-in-form.style.scss'
import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFields = {

    email: '',
    password: '',

}



const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });

    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);

    }

    const logGoogleRedirectUser = async () => {
        const { user } = await signInWithGoogleRedirect();

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const response = await signInAuthUserWithEmailAndPassWord(email, password);
            console.log(response);
            resetFormFields();
        }
        catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    alert('incorrect password for email');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error)
            }

            console.log(error);
        }
    }

    return (
        <div className='sign-up-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={(e) => {
                handleSubmit(e)

            }}>



                <FormInput label='Email' type="email" required onChange={handleChange}
                    name="email"
                    value={email} />

                <FormInput label='Password' type="password" required onChange={handleChange}
                    name="password"
                    value={password}
                />
                <div className='buttons-container'>
                    <Button type="submit">Sign In</Button>
                    <Button type='button' buttonType='google' onClick={signInWithGoogle}>Google sign In</Button>
                </div>

            </form>
        </div>
    )
}

export default SignInForm;