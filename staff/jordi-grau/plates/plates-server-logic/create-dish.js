require ('plates-commons/polyfills/string')
require('plates-commons/polyfills/json')
const { models: { Dish } } = require('plates-data')


module.exports = (name, tags, price) => {
    String.validate.notVoid(name)

    return ( async() =>{
        const dish = await Dish.findOne({ name })

        if(dish) throw new DuplicityError(`Dish with name: ${name}, already exists`)

        await Dish.create({ name, tags, price})

        return;
    } )()
}