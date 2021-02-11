const { writeFile } = require('fs')

const targetPath = './projects/the-application/src/environments/environment.ts'
const targetProdPath = './projects/the-application/src/environments/environment.prod.ts'
const targetRCPath = '.firebaserc'

const envConfigFile = `export const environment = ${process.env.FIREBASE_ANGULAR_ENVIRONMENT}`
const envRCFile = process.env.FIREBASE_ANGULAR_RC

writeFile(targetProdPath, envConfigFile, 'utf8', err => {
  if (err) {
    return console.log(err)
  }
})

writeFile(targetPath, envConfigFile, 'utf8', err => {
  if (err) {
    return console.log(err)
  }
})

writeFile(targetRCPath, envRCFile, 'utf8', err => {
  if (err) {
    return console.log(err)
  }
})
