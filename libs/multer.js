const path = require('path');
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    
    destination: (req, file, cb)=>{
        const uploadDir = path.join(__dirname, '..', 'public', 'upload', `${Date.now()}`);
        fs.mkdirSync(uploadDir);
        cb(null, uploadDir);
    },
    filename:(req, file, cb)=> {
        cb(null, file.originalname);
    }
})
const upload = multer({ storage });
module.exports = upload;