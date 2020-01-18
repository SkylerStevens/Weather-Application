const express = require('express')
const path = require('path')
const hbs = require('hbs')
const weather = require('./utils/weather.js')
const geocode = require('./utils/geocode.js')

const app = express()
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handler bars view and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//static view
app.use(express.static(publicDirectory))

const title = 'Weather App'

//home page
app.get('', (req, res) => {
  res.render('index', {
    title: title,
    pageTitle: 'Home',
    name: 'Skyler Stevens'
  })
})

//about page
app.get('/about', (req, res) => {
  res.render('about', {
    title: title,
    pageTitle: 'About Me',
    image: '/img/me.png',
    name: 'Skyler Stevens'
  })
})

//help page
app.get('/help', (req, res) => {
  res.render('help', {
    title: title,
    pageTitle: 'Help',
    errorMsg: 'Help, I have fallen and I cannot get up',
    name: 'Skyler Stevens'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({ error: 'Must provide an address'})
  } else {
    //calculate geocode
    geocode(req.query.address, (error, data) => {
        if(!data) {
          return res.send({ error: error })
      } else {
            weather(data, (error, data) => {
            if (!data) {
              return res.send({ error: error })
            } else {
              res.send({
                temperature: data
              })
            }
          })
      }
    })
  }
})



app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  } else {
    console.log(req.query.search)
    res.send({
      products: []
    })
  }

})

app.get('/help/*', (req, res) => {
  res.render('404',{
    pageTitle: '404',
    errorMsg: 'Help article not found.',
    name: 'Skyler Stevens'
  })
})

app.get('*', (req, res) => {
  res.render('404',{
    pageTitle: '404',
    errorMsg: 'Page not found.',
    name: 'Skyler Stevens'
  })
})

app.listen(3000, () => {
  console.log('Server is up on port 3000.')
})
