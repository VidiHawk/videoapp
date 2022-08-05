const {storageService} = require("../../../services");

const upload = {};

upload.uploadImage = async(req, res, next) => {
  try {
    const myFile = req.file;
    const type = req.query.type;
    let imageUrl = "";
    switch(type){
      case 'avatar': {
        imageUrl = await storageService.uploadImage(myFile, type, req._siteId, req._userId);
        break;
      }
      default: break;
    }
    res
    .status(200)
    .json({
      message: "Upload was successful",
      data: imageUrl
    })
  } catch (error) {
    next(error)
  }
}

module.exports = upload;