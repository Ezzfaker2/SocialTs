import * as yup from "yup";


export const schema = yup.object().shape({
    email: yup.string().trim().required("Обязательное поле").min(3, "недостаточно символов"),
    password: yup.string().trim().required("Обязательное поле").min(3, "недостаточно символов"),
    checkbox: yup.boolean()
})




