const asyncMiddleware = fn =>
  (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .then((result) => res.send(result))
      .catch(error => {
        console.log(error)
        next()
      })
  }

module.exports = asyncMiddleware