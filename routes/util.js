const mkBase = (req, res, next) => {
    req.burl = 'http://' + req.rawHeaders[1] + '/'
    // req.url = '/'
    console.log(req.rawHeaders[1])
    next()
};

module.exports = mkBase;