/* Error handler middleware */
function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({'error': err.message});
    return;
}

module.exports = errorHandler;
