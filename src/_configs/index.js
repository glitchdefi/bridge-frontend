
//console.log("evn",process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
    //we are in production-return product key!
    module.exports = require('./prod-config');
} else {
    //we are in dev-return dev key!
    module.exports = require('./dev-config');
}
