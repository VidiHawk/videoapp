const util = require('util')

const Cloud = require('@google-cloud/storage');
const path = require('path');
const serviceKey = path.join(`${__dirname}/../../serviceAccountKeys.json`);
console.log(serviceKey)
const { Storage } = Cloud;
const gc = new Storage({
  keyFilename: serviceKey,
  projectId: 'rapid-stage-289208',
})

const BUCKET_NAME = 'emk-beverly-hills-mvp';

const googleStorage = {};
/**
*
* @param { File } object file object that will be uploaded
* @description - This function does the following
* - It uploads a file to the image bucket on Google Cloud
* - It accepts an object as an argument with the
*   "originalname" and "buffer" as keys
*/

googleStorage.uploadImage = (file, type = 'default', siteId, userId) => new Promise((resolve, reject) => {
  const bucket = gc.bucket(BUCKET_NAME);
  let { originalname, buffer } = file
  originalname = `${type}_${siteId}_${userId}`;
  const blob = bucket.file(originalname.replace(/ /g, "_"));
  const blobStream = blob.createWriteStream({
    resumable: false
  });
  blobStream.on('finish', () => {
    const publicUrl = util.format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
    resolve(publicUrl)
  }).on('error', (e) => {
    reject(`Unable to upload image, something went wrong ${e}`)
  }).end(buffer)
});



googleStorage.generateSignedUrl = (siteId, userId, type = 'default', fileName) => new Promise((resolve, reject) => {
    const entityFileName = `${STORAGE_FOLDER[type]}/${userId}_${fileName}`;

    const options = {
      version: "v4",
      action: "write",
      expires: Date.now() + 30 * 60 * 1000, // 30 minutes
      contentType: "ignore",
      extensionHeaders: {
        "x-goog-acl": "public-read"
      }
    };

    gc.bucket(BUCKET_NAME).file(entityFileName).getSignedUrl(options).then(url=>{
      const response = {
        url : url && url[0] ? url[0] : '',
        headers: {
          "x-goog-acl": "public-read"
        }
      }
      return resolve(response)
    });
});

module.exports = googleStorage;

const STORAGE_FOLDER = {
  'review': 'reviews',
  'avatar': 'avatars'
} 