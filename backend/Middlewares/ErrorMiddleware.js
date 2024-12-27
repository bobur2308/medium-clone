function errorHandler(err, res) {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
}

module.exports = errorHandler;