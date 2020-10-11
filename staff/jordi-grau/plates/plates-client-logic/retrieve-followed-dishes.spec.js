require('dotenv').config()
const { env: { TEST_MONGODB_URL: MONGODB_URL, API_URL, TEST_SECRET }} = process
const { mongoose, models: { User, Restaurant, Dish }} = require('plates-data')
global.fetch = require('node-fetch')
const jwt = require('jsonwebtoken')
require('plates-commons/polyfills/json')
require('plates-commons/polyfills/xhr')
const { DuplicityError, UnexistenceError, VoidError, CredentialsError } = require('plates-commons/errors')
const bcrypt = require('bcryptjs')
const { random } = Math
const { expect } = require('chai')
const context = require('./context')
context.API_URL = API_URL
context.storage = {}
const retrieveFollowedDishes = require('./retrieve-followed-dishes')

describe('retrive followed dishes, client logic', () =>{
    let userEmail, password, hash, userId
    let restaurantName, restaurantEmail, cif, address, phone, restaurantId, token
    let dishName, position, price, testDish
    let tags = [ 'gluten free', 'veggie', 'fresh', 'cool']
    let dishesIds = []
    let testDishes = []

    before( async()=>{
        await mongoose.connect(MONGODB_URL)
        await Promise.all([
            User.deleteMany(),
            Restaurant.deleteMany(),
            Dish.deleteMany()
        ])
    })

    beforeEach(async() =>{
        userEmail = `user${random()}@mail.com`
        password = '12341234'
        hash = await bcrypt.hash(password, 10)
        
        const user = await User.create({ email: userEmail, password: hash})
        userId = user.id.toString()
        token = jwt.sign( {sub: userId}, TEST_SECRET, { expiresIn: '1d'})
        context.storage.token = token 

        restaurantName = 'Testing Restaurant'
        restaurantEmail = `restaurantEmail${random()}@mail.com`
        cif = `cif${random()}`
        address = `address${random()}`
        phone = random() * 100000
        const restaurant = await Restaurant.create({ name: restaurantName, email: restaurantEmail, cif: cif, address: address, phone: phone})
        restaurantId = restaurant._id.toString()
        debugger

        for (let i = 0; i < 9; i++) {
            dishName = `dishName${i}`
            position = `${parseInt(random() * 4, 10)}`
            position = position.toString()
            tags = ['good taste', 'veggie', 'fresh', 'gluten free', 'cool']
            testDish = await Dish.create({ restaurantId: restaurant._id, name: dishName, position, tags, price: `${parseInt(random() * 30, 10)}` })
            const { _id } = testDish
            dishId = testDish._id.toString()
            dishesIds.push(dishId)
            testDishes.push(testDish)
            await Restaurant.findByIdAndUpdate(restaurantId, {$addToSet: {dishes: dishId}})
            
            await  User.findByIdAndUpdate(userId, {$push: {following: dishId}})
        }
    })

    it('should retrieve all followed dishes by a user on correct data', async() =>{
  
        const result = await retrieveFollowedDishes(userId)
       // expect(result.length).to.be.greaterThan(0)
        expect(result.following[0]).to.equal(dishesIds[0])
    })
})