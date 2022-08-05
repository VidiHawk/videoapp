const express = require('express');
const router = express.Router();
const upload = require("./upload");
const error = require('../error');
const auths = require("../auths");

router.post(`/upload`,
auths.setCredentials,
auths.verify,
upload.uploadImage,
error)

module.exports = router;