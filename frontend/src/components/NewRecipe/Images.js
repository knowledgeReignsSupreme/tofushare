import React, { useState } from 'react';
import axios from 'axios';
import { InputWrapper } from '../../GlobalStyles';
import styled from 'styled-components';
import CommonLoader from '../CommonLoader';

const Images = ({
  setImages,
  images,
  imagesError,
  isImageUploading,
  setIsImageUploading,
}) => {
  const [uploadError, setUploadError] = useState(false);

  const checkFile = (file) => {
    if (file.size < 3000000) {
      return true;
    } else {
      return false;
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (checkFile(file)) {
      setUploadError(false);
      const formData = new FormData();
      formData.append('file', file);
      setIsImageUploading(true);
      try {
        const config = {
          headers: {
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': 'multipart/form-data',
          },
        };
        const { data } = await axios.post('/api/upload', formData, config);
        setImages(data);
        setIsImageUploading(false);
      } catch (error) {
        setIsImageUploading(false);
      }
    } else {
      setUploadError(true);
    }
  };

  return (
    <SingleInput>
      <label htmlFor='title'>
        <span>*</span>
        תמונה:
      </label>
      <input
        type='file'
        id='image-file'
        label='Choose File'
        name='file'
        onChange={uploadFileHandler}
      />
      {imagesError && (
        <span>
          <p>חובה לבחור תמונה</p>
        </span>
      )}
      {uploadError && (
        <span>
          <p>תמונה גדולה מדי. על התמונה להיות פחות מ 3MB</p>
        </span>
      )}
      {isImageUploading ? <CommonLoader size='30' /> : ''}
    </SingleInput>
  );
};

const SingleInput = styled(InputWrapper)`
  input {
    height: initial !important;
  }
`;

export default Images;
