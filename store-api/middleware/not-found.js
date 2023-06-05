const notFound = (req, res) => {
    return res.status(404).send('Route Does Not Exists')
}

module.exports = notFound