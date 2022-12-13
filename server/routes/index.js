const exportDataset = require('@sanity/export')
const { prodClient, testClient } = require('./clients')
var express = require('express');
var router = express.Router();
var cors = require('cors')

const fs = require('fs')
const sanityImport = require('@sanity/import')

const corsOptions = {
  origin: 'http://localhost:3333',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

/* Export to test */
router.get('/', function (req, res, next) {
  exportFromProd().then(() => importToTest()
    .then(() => res.status(200).send())
    .catch(() => res.status(500).send()))
    .catch(() => res.status(500).send())
});

router.get('/import', async function (req, res, next) {
  try {

    await exportFromProd()

    importToTest()

    return res.send()
  } catch (e) {
    return res.status(500).send(e.message)
  }
});

router.get('/import/document/:id', cors(corsOptions), async function (req, res, next) {
  try {

    const document = await exportDocumentFromProd(req.params.id, prodClient)


    importDocumentToTest(document)

    res.status(200);
    return res.send()
  } catch (e) {
    return res.status(500).send(e.message)
  }
});

function importToTest() {
  // Input can either be a readable stream (for a `.tar.gz` or `.ndjson` file), a folder location (string), or an array of documents
  console.log("About to import into test...")
  const input = fs.createReadStream('./myDataset.tar.gz')
  console.log("Found dataset...")
  return sanityImport(input, {
    client: testClient,
    operation: 'createOrReplace' // `create`, `createOrReplace` or `createIfNotExists`
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
    operation: 'createOrReplace' // `create`, `createOrReplace` or `createIfNotExists`
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
  console.log("Fetching export data from prod ....%%%")
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
  console.log(id)
  const document = await client.getDocument(id)
  console.log(document)

  return document
}

module.exports = router;


