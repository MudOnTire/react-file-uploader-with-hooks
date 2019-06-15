import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {

  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});

  const handleChange = (e) => {
    const newFile = e.target.files && e.target.files[0];
    if (newFile) {
      setFile(newFile);
      setFilename(newFile.name);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await axios.post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        const { fileName, filePath } = res.data;
        setUploadedFile({
          fileName,
          filePath
        });
      } catch (err) {
        alert(err.message);
      }

    } else {
      alert('Please choose a file first');
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="custom-file">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            multiple={false}
            onChange={handleChange}
          />
          <label className="custom-file-label" htmlFor="customFile">{filename}</label>
        </div>

        <button type='submit' className='btn btn-primary btn-block mt-4'>Upload</button>
      </form>
    </>
  )
}

export default FileUpload
