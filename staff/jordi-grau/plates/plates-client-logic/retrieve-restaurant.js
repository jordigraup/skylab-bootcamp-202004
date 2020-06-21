require('plates-commons/polyfills/string')
const { utils: { Email, call }} = require('plates-commons')
const context = require('./context');


module.exports = function(restaurantId) {
    String.validate.notVoid(restaurantId);

    return (async() => {
        const response = await call(
            'GET',
            `${this.API_URL}/restaurant/${restaurantId}`,
            undefined,
            null);

        const { status, body } = response;
        
        if (status === 200) {
            const restaurant = JSON.parse(body)
            return restaurant;
        }
        else{
            const {error} = JSON.parse(body)
                throw new Error(error)
        }
    })();
}.bind(context)