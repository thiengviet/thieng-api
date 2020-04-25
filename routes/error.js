module.exports = {
  // Catch 404 for uncatched APIs
  uncatchableAPI: function (req, res, next) {
    next('Not found.');
  },
  // Error handler
  errorHandler: function (er, req, res, next) {
    res.status(500);
    res.send({ errors: [{ message: er || 'Unknown error' }] });
  }
}