const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { resolve } = require('dns')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Quang'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Quang'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Help Content',
        name: 'Quang'
    })
})

app.get('/weather', (req, res) => {
    let address = req.query.address

    if (!address) {
        return res.send('You must provide an address')
    }

    geocode(address, (error, { latitude, longtitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longtitude, (error, data) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: data,
                location,
                address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({ // without return, there'll be error: Cannot set headers...
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title: '404',
        message: 'Help article not found',
        name: 'Quang'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        message: 'Page not found',
        name: 'Quang'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})