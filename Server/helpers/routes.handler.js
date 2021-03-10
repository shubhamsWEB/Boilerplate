exports.successHandler = (res, data, message, statusCode) => {
  if (!data) {
    res.status(statusCode).send({
      message
    })
  } else {
    res.status(statusCode).send({
      message,
      data
    })
  }
}
exports.errorHandler = (res, errorMessage, statusCode) => {
  res.status(statusCode).send({
    message: errorMessage
  })
}
