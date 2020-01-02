const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = 4000
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./DB.js')
const postRoute = require('./routes/post.route')
const session = require('express-session')
const cookieParser = require('cookie-parser')

mongoose.Promise = global.Promise
mongoose.connect(config.DB, {useNewUrlParser: true, useUnifiedTopology: true}).then(
  () => {console.log(`Database is connected`)},
  err => {console.log(`Can not connect to the database ${err}`)}
)

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(cookieParser('secret'))
app.use(session({ key: 'secret' })) //sessionID 암호화

app.use('/posts', postRoute)

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})
