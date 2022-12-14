const express = require('express');
const router= express.Router();

const menu = require('./menu');
const video = require('./video');
const comment = require('./comment');
const users = require('./users');
const reviews = require('./reviews');
const product = require('./product');
const imageUploader = require('./imageUploader');
const common = require('./common');
const sitemap = require('./sitemap');

router.use('/menu', menu);
router.use('/video', video);
router.use('/comment', comment);
router.use('/users', users);
router.use('/reviews', reviews);
router.use('/image', imageUploader);
router.use('/product', product);
router.use('/common', common);
router.use('/sitemap', sitemap);
router.use('/liveSessions', require("./liveSessions"));
router.use('/productMenu', require("./productMenus"));

module.exports= router;