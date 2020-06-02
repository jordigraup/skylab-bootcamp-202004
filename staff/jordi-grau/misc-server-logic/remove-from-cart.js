require('misc-commons/polyfills/string')
const { mongo } = require('../data')

module.exports = (userId,product) => {
    String.validate.notVoid(userId)
    if (typeof product !== 'object') throw new TypeError(`${newInfo} is not an object`)
    
    return mongo.connect()
        .then(connection => {
        
            const carts = connection.db().collection('carts')
            db.carts.updateOne( { _id : ObjectId ( userId ) } , { $pull: { votes: { $gte: 6 } } } )
            return users.deleteOne( { _id : ObjectId ( userId ) } )    
        })
}