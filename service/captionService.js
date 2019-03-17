const client = require('../client/captionClient')

exports.getCaptionsById = (captionId) => {
  client.downloadCaptionById(captionId).then((response) => {
    console.log('response', response);
  })
}