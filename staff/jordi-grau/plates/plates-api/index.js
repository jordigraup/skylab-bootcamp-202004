require('dotenv').config()

const { argv: [, , PORT_CLI], env: { PORT: PORT_ENV, MONGODB_URL } } = process
const PORT = PORT_CLI || PORT_ENV || 8080

const express = require('express')
const bodyParser = require('body-parser')
const { mongoose } = require ('misc-data')