'use strict'

const Language = require('@google-cloud/language')
const cors = require('cors')({ origin: true })

const language = new Language.LanguageServiceClient()

exports.analyze = (req, res) => {
  cors(req, res, () => {
    const {
      content,
      extractSyntax,
      extractEntitySentiment,
      extractDocumentSentiment,
      extractEntities,
      classifyText
    } = req.body

    if (!content) {
      res.status(400).send('No content is provided')
      return
    }

    const document = { content, type: 'PLAIN_TEXT' }
    const features = {
      extractSyntax: extractSyntax || false,
      extractEntitySentiment: extractEntitySentiment || false,
      extractDocumentSentiment: extractDocumentSentiment || false,
      extractEntities: extractEntities || false,
      classifyText: classifyText || false
    }

    language
      .annotateText({ document, features })
      .then(([results]) => {
        res.setHeader('Content-Type', 'application/json')
        res.status(200).send(results)
      })
      .catch(err =>
        res
          .status(400)
          .send(
            'Error in invoking the Natural Language API. Reason : ' +
              err.toString()
          )
      )
  })
}
