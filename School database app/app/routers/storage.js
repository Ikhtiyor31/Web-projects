const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');

// image upload destination set up 
const storage = multer.diskStorage({
     destination: './public/uploads/',
	 filename: function (req, file, cb) {
	file.uploadedFile = {
			name: mongoose.Types.ObjectId(),
			ext: file.mimetype.split('/')[1]
		};
		cb(null, file.uploadedFile.name + '.' + file.uploadedFile.ext);

	}
});
const uploads = multer({ storage: storage});

module.exports = uploads;


