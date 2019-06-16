import React, { useState } from 'react';
import axios from 'axios';
import Message from './Message';
import Progress from './Progress';

const FileUpload = () => {

  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);

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
          },
          onUploadProgress: progressEvent => {
            const { loaded, total } = progressEvent;
            setUploadPercentage(parseInt(Math.round(loaded * 100)) / total);
            setTimeout(() => {
              setUploadPercentage(0)
            }, 10000);
          }
        });
        const { fileName, filePath } = res.data;
        setUploadedFile({
          fileName,
          filePath
        });
        setMessage('File Uploaded!');
      } catch (err) {
        const msg = err.response && err.response.data && err.response.data.msg;
        setMessage(msg || 'Unknown Error');
      }

    } else {
      alert('Please choose a file first');
    }
  }

  return (
    <>
      {
        message && <Message msg={message} />
      }
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
        <Progress percentage={uploadPercentage} />
        <button type='submit' className='btn btn-primary btn-block mt-4'>Upload</button>
      </form>
      {
        uploadedFile ?
          <div className='row mt-5'>
            <div className='col-md-6 m-auto'>
              <h3 className='text-center'>{uploadedFile.fileName}</h3>
              <img style={{ width: '100%' }} src={uploadedFile.filePath} />
            </div>
          </div>
          :
          null
      }
    </>
  )
}

export default FileUpload
