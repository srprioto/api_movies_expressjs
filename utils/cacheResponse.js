const { config } = require('../config');

function cacheRespose(res, seconds) {
    if(!config.dev){
        res.set("Cache-Control", `public, max-age=${seconds}`)
    }
}

module.exports = cacheRespose;