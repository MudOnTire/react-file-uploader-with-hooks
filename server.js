const path = require('path');
const fs = require('fs');
const express = require('express');
const uploader = require('express-fileupload');

const app = express();

app.use(uploader());

app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;
  const targetPath = path.resolve(__dirname, `public/uploads/`);

  const handleUploaded = () => {
    file.mv(path.resolve(targetPath, file.name), err => {
      if (err) {
        return res.status(500).json({ msg: err.message });
      }
      res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    })
  }

  fs.exists(targetPath, (exists) => {
    if (exists) {
      handleUploaded();
    } else {
      fs.mkdir(targetPath, { recursive: true }, (err) => {
        if (err) {
          return res.status(500).json({ msg: err.message });
        } else {
          handleUploaded();
        }
      });
    }
  });

});

app.use(express.static('public'));

app.listen(5050, () => console.log('server started'));
