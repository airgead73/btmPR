const cors = require('cors')({ origin: true });
const DB = require('./admin');

const BASE_URL = 'https://res.cloudinary.com/dpm/image/upload/w_750/l_text:Verdana_12_normal:%C2%A9%20Brian%20Moneypenny,g_south_east,y_8,x_8,co_rgb:FFFFFF/bmoneypenny/work/';

const formatImg =(doc) => {
  let imgData = doc.data();
  let newImg = {};
  newImg.id = doc.id;
  newImg.title = imgData.title;
  newImg.src = BASE_URL + imgData.file;
  newImg.alt = imgData.alt;
  return newImg;
}

const filterSingle = (req, res) => {
  return cors(req, res, () => {
    if(req.method !== 'GET') {
      return res.status(401).json({
        message: 'method not allowed'
      });
    };
    let filter = req.query.filter;
    let value = req.query.filterValue;
    let images = [];
    return DB.collection('images')
           .where(filter, "==", value)
           .get()
           .then((querySnapshot) => {
             querySnapshot.forEach((doc) => {
              images.push(formatImg(doc));
             });
           })
           .then(() => {
             res.status(200).json(images);
           })
           .catch((err) => {
             res.status(err.status).json({
               message: err.message
             });
           });
  });

}

const filterModalityCategory = (req, res) => {
  return cors(req, res, () => {
    if(req.method !== 'GET') {
      return res.status(401).json({
        message: 'method not allowed'
      });
    };
    let modality = req.query.modality;
    let category = req.query.category;
    let images = [];
    return DB.collection('images')
           .where("modality", "==", modality)
           .where("category", "==", category)
           .get()
           .then((querySnapshot) => {
             querySnapshot.forEach((doc) => {
              images.push(formatImg(doc));
             });
           })
           .then(() => {
             res.status(200).json(images);
           })
           .catch((err) => {
             res.status(err.status).json({
               message: err.message
             });
           });
  });

}

const filterModalityMedium = (req, res) => {
  return cors(req, res, () => {
    if(req.method !== 'GET') {
      return res.status(401).json({
        message: 'method not allowed'
      });
    };
    let modality = req.query.modality;
    let medium = req.query.medium;
    let images = [];
    return DB.collection('images')
           .where("modality", "==", modality)
           .where("medium", "==", medium)
           .get()
           .then((querySnapshot) => {
             querySnapshot.forEach((doc) => {
              images.push(formatImg(doc));
             });
           })
           .then(() => {
             res.status(200).json(images);
           })
           .catch((err) => {
             res.status(err.status).json({
               message: err.message
             });
           });
  });

}

module.exports = {
  filterSingle,
  filterModalityCategory
}