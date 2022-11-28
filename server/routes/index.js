const exportDataset = require('@sanity/export')
const { prodClient, testClient } = require('./clients')
var express = require('express');
var router = express.Router();

const fs = require('fs')
const sanityImport = require('@sanity/import')

/* Export to test */
router.get('/', function (req, res, next) {
  exportFromProd().then(() => importToTest()
    .then(() => res.status(200).send())
    .catch(() => res.status(500).send()))
    .catch(() => res.status(500).send())
});

router.get('/import/document/:id', async function (req, res, next) {
  try {
    console.log(req.params.id)
    const document = await exportDocumentFromProd(req.params.id, prodClient)
    console.log(document)
    // importDocumentToTest(document)
    return res.send(document)
  } catch (e) {
    return res.status(500).send(e.message)
  }
});

function importToTest() {
  // Input can either be a readable stream (for a `.tar.gz` or `.ndjson` file), a folder location (string), or an array of documents
  const input = fs.createReadStream('./myDataset.tar.gz')
  return sanityImport(input, {
    client: testClient,
    operation: 'delete' // `create`, `createOrReplace` or `createIfNotExists`
  })
    .then(({ numDocs, warnings }) => {
      console.log('Imported %d documents', numDocs)
      // Note: There might be warnings! Check `warnings`
    })
    .catch(err => {
      console.error('Import failed: %s', err.message)
    })

}

function importDocumentToTest(document) {
  // Input can either be a readable stream (for a `.tar.gz` or `.ndjson` file), a folder location (string), or an array of documents
  return sanityImport([document], {
    client: testClient,
    operation: 'createIfNotExists' // `create`, `createOrReplace` or `createIfNotExists`
  })
    .then(({ numDocs, warnings }) => {
      console.log('Imported %d documents', numDocs)
      // Note: There might be warnings! Check `warnings`
    })
    .catch(err => {
      console.error('Import failed: %s', err.message)
    })

}


function exportFromProd() {
  return exportDataset({
    // Instance of @sanity/client configured to correct project ID and dataset
    client: prodClient,

    // Name of dataset to export
    dataset: 'production',

    // Path to write tar.gz-archive file to, or `-` for stdout
    outputPath: './myDataset.tar.gz',

  })
}

async function exportDocumentFromProd(id, client) {
  const document = await client.getDocument(id)

  return document
}

module.exports = router;


