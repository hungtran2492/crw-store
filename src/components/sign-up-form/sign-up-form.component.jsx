import { async } from "@firebase/util";
import { useState } from "react";
import { createAuthUserWithEmailAndPassWord } from "../../ultils/firebase/firebase.utils";
const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}



const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }
        try {
            await createAuthUserWithEmailAndPassWord(displayName, email, password);
        }
        catch (error) {
            console.log('user creation has error: ', error)
        }

    }

    return (
        <div>
            <h1>
                Sign up with your email and passwrod
            </h1>
            <form onSubmit={(e) => {
                handleSubmit(e)

            }}>
                <label htmlFor="">Display Name</label>
                <input type="text" required onChange={handleChange}
                    name="displayName"
                    value={displayName} />
                <label htmlFor="">Email</label>
                <input type="email" required onChange={handleChange}
                    name="email"
                    value={email} />
                <label htmlFor="">Password</label>
                <input type="password" required onChange={handleChange}
                    name="password"
                    value={password}
                />
                <label htmlFor="">Confirm Password</label>
                <input type="text" onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SignUpForm;