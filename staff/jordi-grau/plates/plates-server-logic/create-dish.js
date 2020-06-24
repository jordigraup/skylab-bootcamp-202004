require ('plates-commons/polyfills/string')
require('plates-commons/polyfills/json')
const { models: { Dish } } = require('plates-data')

/**
 * function creates a dish on db.
 * @param {string} name data required to create dish on db. 
 * @param {string} tags array of strings, can be empty, not required
 * @param {string} price data info of dish.
 */
module.exports = (name, tags, price) => {
    String.validate.notVoid(name)

    return ( async() =>{
        const dish = await Dish.findOne({ name })

        if(dish) throw new DuplicityError(`Dish with name: ${name}, already exists`)

        await Dish.create({ name, tags, price})

        return;
    } )()
}