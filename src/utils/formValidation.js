import joi from "joi-browser"
export const customValidator = (data, schema) => {
    let result = joi.validate(data, schema, { abortEarly: false })
    let usefulErrors = {};
    if (result.error) {
        usefulErrors = result.error.details.reduce((formatError, error) => ({
            ...formatError, [error.path]: error.message
        }), {});
    }
    return usefulErrors
}

