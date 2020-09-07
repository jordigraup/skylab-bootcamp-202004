require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL}} = process
const { mongoose, models: {User, Restaurant, Dish}} = require('plates-data')
const { errors: {DuplicityError, VoidError, UnexistenceError }} = require('plates-commons')
const { expect } = require('chai')
const { random } = Math
const bcrypt = require('bcryptjs')
const setDishAvailable = require('./set-dish-available')

describe('set dish to available', () => {
    
        let userEmail, password, hash
        let restaurantName, address, restaurantEmail, cif , phone
        let dishName, position, price
        let tags = []
        let followers = []
        let dishes = []       
    

    before(async() =>{
        mongoose.connect(MONGODB_URL)
        await Promise.all([
            User.deleteMany(),
            Restaurant.deleteMany(),
            Dish.deleteMany()
        ])
    })
    beforeEach( async() =>{
        userEmail = `useremail-${random()}@mail.com`
        password = `password-${random()}`
        hash = await bcrypt.hash(password, 10)
        const user = await User.create({email: userEmail, password: hash})
        const userId = user.id.toString()

        restaurantName = `restaurantname-${random()}`
        restaurantEmail = `restaurantemail-${random()}@mail.com`
        address = `address-${random()}`
        cif = `cif-${random()}`
        phone = random() * 100000
        const restaurant = await Restaurant.create({ owner: userId, name: restaurantName, address, cif, phone, email: restaurantEmail})
        const restaurantId = restaurant._id.toString()

        for( let i = 0; i < 10; i++) {
            dishName = `dishName-${i}`
            position = `${(random() +1 ) * 3}`
            tags = [ 'cool', 'veggie', 'glutten free', 'best you ever taste']
            price = `${parseInt(random() * 30, 10)}`
            const dish = await Dish.create({ restaurantId, name: dishName, position, tags, price})
            dishes.push(dish)           
        }
    })

    describe('set dish available', ()=>{
        it('should set to available a dish on correct data', async() =>{
            dishId = dishes[0]._id.toString()
            await Dish.findByIdAndUpdate(dishId, {$set: { available: false }})
            await setDishAvailable( dishId )
            let testDish = await Dish.findById( dishId ) 
            let result = testDish
            expect(result.available).to.equal(true)
        })
    })
    describe('set dish to available unhappy path', () =>{
        it('should throw an error  when an unexisting dishId is passed', async ()=> {
            try {
                dishId = "5f43fc19c269e5cbe95f1318"
                await setDishAvailable(dishId)
            } catch (error) {
                expect(error).to.be.instanceOf(UnexistenceError)
                expect(error.message).to.equal(`dish with id: ${dishId} does not exist`)    
            }
        }) 
    })
    
    describe('set dish to available  unhappy path', async () =>{
        
        dishId = dishes[2]._id
        await Dish.findByIdAndUpdate( dishId, {$addToSet: {available: true} })
        
        it('should throw an error  when a dish is already available', async ()=> {
            try {
                await setDishAvailable(dishId)
            } catch (error) {
                expect(error).to.be.instanceOf(VoidError)
                expect(error.message).to.equal(`dish with id: ${dishId} is already available`)    
            }
        }) 
    })

    describe('set dish to available, validations', ()=> {
        const fakeId = []
        dishId = fakeId
        it('should throw an error when a non string dishId is passed', () =>{
            try {
                setDishAvailable(dishId)
            } catch (error) {
                expect(error).to.be.instanceOf(TypeError)
                expect(error).message.to.equal(`${dishId} is not a string`)
            }
        })
    })

    after( async()=> {
        Promise.all([
            User.deleteMany(),
            Restaurant.deleteMany(),
            Dish.deleteMany()
        ])
        mongoose.disconnect()
    })
})