const axios = require('axios')
const util = require('util')

const devHost = "http://localhost:8081"
const prodHost = "https://bbv8-py.herokuapp.com"
const service = "/captions/%s"
const url = (process.env.ENV == "DEV" ? devHost : prodHost) + service;

console.log(`Service url => ${url}`);


exports.downloadCaptionById = (captionId) => {
  return axios.get(util.format(url, captionId))
}