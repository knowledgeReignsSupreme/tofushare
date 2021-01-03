import React, { useState } from 'react';
import axios from 'axios';
import { InputWrapper } from '../../GlobalStyles';
import styled from 'styled-components';
import CommonLoader from '../CommonLoader';

const Images = ({ setImages, images, imagesError }) => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    setIsUploading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/api/upload', formData, config);
      setImages(data);
      setIsUploading(false);
    } catch (error) {
      setIsUploading(false);
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
      {isUploading ? <CommonLoader size='30' /> : ''}
    </SingleInput>
  );
};

const SingleInput = styled(InputWrapper)`
  input {
    height: initial !important;
  }
`;

export default Images;
