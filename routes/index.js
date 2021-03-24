var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/get-images', function(req, res) {

  const modelImagesDir = path.join(__dirname, '../public/images/modelimages');
  const allImages = [];
  fs.readdir(modelImagesDir, (err, files) => {
    if (err)
      console.log(err);
    else {
      files.forEach(file => {
        allImages.push({
          filename: file,
          url: `/images/modelimages/${file}`
        });
      })
      return res.json({
        status: true,
        files: allImages
      })
    }
  })
})

router.get('/image-metadata/:imgname', function(req, res) {

  const { imgname = false } = req.params;

  if( imgname === false ) {
    return res.json({
      status: false,
      msg: 'Image Name is required to get its metadata'
    })
  }

  const imagePathJson = path.join(__dirname, `../models/${imgname}.json`);

  if (fs.existsSync(imagePathJson)) {

    fs.readFile(imagePathJson, 'utf-8', function(err, data) {

      if( err ) {
        return res.json({
          status: false,
          msg: 'Something went wrong withh the metadata'
        })
      }

      const allMetadata = JSON.parse(data);

      const metadataCount = {};

      allMetadata.forEach((data) => {

        if( data.className === 'barcode' ) {
          if( data.code in metadataCount ) {
            metadataCount[data.code]['count'] = metadataCount[data.code]['count'] + 1;
          } else {
            metadataCount[data.code] = {
              code: data.code,
              count: 1
            }
          }   
        } else {
          if( 'box' in metadataCount ) {
            metadataCount['box']['count'] = metadataCount['box']['count'] + 1;
          } else {
            metadataCount['box'] = {
              code: 'box',
              count: 1
            }
          }
        }
      })

      return res.json({
        status: true,
        metadata: metadataCount
      })
    })
  } else {
    return res.json({
      status: false,
      msg: `No meta data exist with filename ${imgname}`
    })
  }
})

module.exports = router;
