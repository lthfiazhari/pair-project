const express = require('express')
const app = express()
const port = 3500
const router = require('./routers')
const session = require('express-session')


app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))




app.use(router)


app.listen(port, function() {
    console.log(`apps running on port; ${port}`);
})