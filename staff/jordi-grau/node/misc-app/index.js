const node = require('node')

const app = express()

app.use(express.static('public'))

app.get('/hello.world')