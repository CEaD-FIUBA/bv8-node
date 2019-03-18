const client = require('../client/captionClient')

exports.getCaptionsById = (captionId) => {
  return client.downloadCaptionById(captionId).then((response) => {
    const themes = response.data.captions.filter((c => c.caption.includes('Tema:')))
    const captions = response.data.captions.filter((c => !c.caption.includes('Tema:')))
    return {
      'themes': themes,
      'captions': captions
    }
  });
}