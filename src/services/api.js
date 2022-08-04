const axios = require('axios');


const apiJedi = axios.create({
  baseURL:"https://swapi.dev/api"
})

module.exports = apiJedi