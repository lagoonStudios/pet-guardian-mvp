import * as yup from "yup";

export const signInDtoSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

export const signUpDtoSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});
