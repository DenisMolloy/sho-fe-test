const path = require('path')
const fs = require('fs-extra')
const klaw = require('klaw')

const docsToUpdate = ['frontend-checkout', 'frontend-ui']

const isReadme = async src => {
  if (src.toLowerCase().endsWith('readme.md')) return true
}

function createTargetPath(doc, fullSrcFilePath) {
  return `./docs/${doc}/${fullSrcFilePath
    .replace(path.join(__dirname, '..', 'node_modules', doc, 'src'), '')
    .replace(path.join(__dirname, '..', 'node_modules', doc), '')}`
}

async function copyDocsFromFrontendPackages() {
  for (const doc of docsToUpdate) {
    klaw(`./node_modules/${doc}`)
      .on('data', ({ path: srcFilePath }) => {
        fs.copy(srcFilePath, createTargetPath(doc, srcFilePath), isReadme, err => {
          if (err) return console.error(err)
        })
      })
      .on('end', () => {
        console.log(`Latest version of docs for ${doc} are copied to /docs dir.`)
      })
  }
}

copyDocsFromFrontendPackages()
