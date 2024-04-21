const validateSchema = (req, schema) => {
    const validation = schema.validate(req);
    if (validation.error) {
        let errorName = validation.error.name;
        let errorReason = validation.error.details !== undefined ? validation.error.details[0].message.replace(/['"]+/g, "") : 'Parameter missing or parameter type is wrong';
        throw errorReason;
    }
    return true;
}

module.exports = {
    validateSchema
}