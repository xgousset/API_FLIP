const multer = require('multer');
const path = require('path');

const storageArt = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = 'articles';
        cb(null, path.join(__dirname, '..', 'images', folder));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const storageStand = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = 'stands';
        cb(null, path.join(__dirname, '..', 'images', folder));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const storageTour = multer.diskStorage({
    destination: (req, file, cb) => {
        const folder = 'tournois';
        cb(null, path.join(__dirname, '..', 'images', folder));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const uploadArt = multer({ storage: storageArt });
const uploadStand = multer({ storage: storageStand });
const uploadTour = multer({ storage: storageTour });

module.exports = { uploadArt, uploadStand, uploadTour };