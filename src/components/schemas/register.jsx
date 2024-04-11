import * as Yup from 'yup'

export const regSchema = Yup.object({

email:Yup.string().email().required(),
name: Yup.string().required(),
password:Yup.string().required().matches(/^(?=.*[a-z].*[a-z].*[a-z]).{3,30}$/),
cPassword:Yup.string().required().oneOf([Yup.ref('password')])

})