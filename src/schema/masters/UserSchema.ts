import * as yup from "yup"

const userSchema = yup.object({
    username: yup.string().required('Username requiered'),
    password: yup.string().required('Password required'),
    email: yup.string().required('Password required'),
    phone: yup.string().required('Password required'),
});

export default userSchema