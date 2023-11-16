 const allowedOrigins = require('./allowedOrigins');
const corsOptions = {
    origin: (origin, callback) => {
        if(allowedOrigins.indexOf(origin) !== -1 || !origin ){
            //!origin must be removed before production 
            callback(null, true);
        } else {
            callback(new Error('404 not founded'));
        }
    },
    optionsSuccessStatus:200
}

module.exports = corsOptions;