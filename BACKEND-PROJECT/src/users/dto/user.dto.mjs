import joi from "joi";

export class UserDataValidator {
  static userCreateScheme = joi.object({
    first_name: joi.string().trim().lowercase().min(3).max(10).required(),

    last_name: joi.string().trim().lowercase().min(3).max(10).required(),

    username: joi.string().trim().lowercase().min(3).max(10).required(),

    date_of_birth: joi.string(),

    gender: joi.string().valid("male", "female").lowercase().required(),

    status
  });
}

[
  {
    id: "",
    first_name: "",
    last_name: "",
    date_of_birth: "",
    username: "",
    gender: "",
    status: "",
    role: "",
    marital_status: "",
    password: "",
    created_At: "",
    updated_At: "",
  },
];
