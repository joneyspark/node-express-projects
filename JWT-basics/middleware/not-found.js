const notFound = (req, res) => {
    try {
        return res.status(404).send('Route Not Exists')
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = notFound