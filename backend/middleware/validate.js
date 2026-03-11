
const validate = ({schema}) => {
    return (req,res,next) => {
       for(key in schema) {
        const {value , error} = schema[key].validate(req[key])

        if(error) {
            return res.status(422).json({
                error : error?.details,
            })
        }

        req[key]=value
       }
       next()
    }
}

module.exports = validate