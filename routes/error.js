module.exports = {
  // Catch 404 for uncatched APIs
  uncatchableAPI: function (req, res, next) {
    var er = new Error('Not Found');
    er.status = 404;
    next(er);
  },
  // Error handler
  errorHandler: function (er, req, res, next) {
    res.status(er.status || 500);
    res.send({ status: 'ERROR', message: er.message || 'error' });
  }
}