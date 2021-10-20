module.exports.notFound = (req, res, next) =>{
    const error = new Error(`Not found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

module.exports.errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode=== 200? 500: res.statusCode
    res.status(statusCode)
    const info = {
        message: err.message
    }

    res.json(info)
}