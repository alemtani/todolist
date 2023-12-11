/* Construct the error payload */
function createError(status, message) {
    const error = new Error(message);
    error.statusCode = status;
    return error;
}

module.exports = {
    createError,
};
