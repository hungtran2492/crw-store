import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import { signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth, auth } from '../../ultils/firebase/firebase.utils'
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';


const SignIn = () => {
    useEffect(() => {
        async function fetchRedirectUserData() {
            const response = await getRedirectResult(auth);
            if (response) {
                const userDocRef = await createUserDocumentFromAuth(response.user);
            }

        }
        fetchRedirectUserData();

    }, [])
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user);

    }
    const logGoogleRedirectUser = async () => {
        const { user } = await signInWithGoogleRedirect();

    }

    return (
        <div>
            <h1>sign in page</h1>
            <button onClick={logGoogleUser}> Sign in with google Popup</button>
            <button onClick={logGoogleRedirectUser}> Sign in with google Redirect</button>
            <SignUpForm />
        </div>
    )
}

export default SignIn;