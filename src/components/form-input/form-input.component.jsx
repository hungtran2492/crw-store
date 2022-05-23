import { Group, FormInputLabel, Input } from './form-input.style.jsx'

const FormInput = ({ label, ...otherProps }) => {
    return (
        <Group>
            <Input {...otherProps} />
            {
                label && (
                    <FormInputLabel
                        shrink={otherProps.value.length}
                        htmlFor="">{label}</FormInputLabel>
                )
            }


        </Group>
    )
}

export default FormInput;