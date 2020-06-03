require('misc-commons/polyfills/string')
const { mongo } = require('misc-data')

module.exports = ({ name, description, price, url }) => {
    String.validate.notVoid(name)
    String.validate.notVoid(description)
   // if (!(price !== typeof('number')) throw new TypeError(`wrong ${price} input`)
    String.validate.notVoid(url)

    return mongo.connect()
        .then(connection => {
            const products = connection.db().collection('products')
            return products.insertOne({ name, description, price, url })
        })
}