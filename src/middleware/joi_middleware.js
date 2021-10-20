const Joi = require('joi')
const middleware = (schema, property) =>{
    return (req, res, next) =>{
        const {error} = schema.validate(req[property])
        const valid = error === undefined|| error === null
        if(valid){
            next()
        }else{
            const {details} = error;
            res.status(422).json({error: details})
        }
    }
}

module.exports = middleware