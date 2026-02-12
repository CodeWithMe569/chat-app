module.exports = (schema) => {
    return (req, res, next) => {

        const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });

        if (error) {
            return res.status(400).json({
                msg: error.details[0].message
            })
        }

        // sanitized data overwrite
        req.body = value

        next()
    }
}
