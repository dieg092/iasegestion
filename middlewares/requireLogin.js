module.exports = (req, res, next) => {
  console.log(req)
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in' });
  }

  next();
};
