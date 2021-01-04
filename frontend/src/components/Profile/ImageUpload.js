import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../actions/userActions';
import axios from 'axios';
import { mainColorButton } from '../../GlobalStyles';
import styled from 'styled-components';
import CommonLoader from '../CommonLoader';
import { FaUpload } from 'react-icons/fa';

const ImageUpload = ({ isEditing, setIsEditing, currentUser }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(false);
  const [newImage, setNewImage] = useState('');
  const [fileName, setFileName] = useState(false);
  const dispatch = useDispatch();

  const fileInfoHandler = async (e) => {
    const file = e.target.files[0];
    checkFile(file);
    setFileName(file.name);
    const formData = new FormData();
    formData.append('file', file);
    if (checkFile(file)) {
      setUploadError(false);
      setIsUploading(true);
      try {
        const config = {
          headers: {
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': 'multipart/form-data',
          },
        };
        const { data } = await axios.post('/api/upload', formData, config);
        setNewImage(data);
        setIsUploading(false);
      } catch (error) {
        setIsUploading(false);
      }
    } else {
      setUploadError(true);
    }
  };

  const checkFile = (file) => {
    if (file.size < 3000000) {
      return true;
    } else {
      return false;
    }
  };

  const uploadFileHandler = () => {
    if (!isUploading && !uploadError) {
      dispatch(
        updateUser(currentUser, {
          _id: currentUser._id,
          image: newImage,
        })
      );
    }
    window.location.reload();
  };

  return (
    <StyledUpload>
      <label htmlFor='title'>
        <span>*</span>
        תמונה:
      </label>
      <input
        type='file'
        id='image-file'
        label='Choose File'
        name='file'
        onChange={fileInfoHandler}
      />
      {fileName && <p>שם הקובץ: {fileName} </p>}
      {uploadError && <p>הקובץ גדול מדי. הגודל המקסימלי הינו 3MB</p>}
      {isUploading ? (
        <UploadButton disabled={true}>
          <FaUpload />
          העלאה
        </UploadButton>
      ) : (
        <UploadButton onClick={uploadFileHandler}>
          <FaUpload />
          העלאה
        </UploadButton>
      )}

      {isUploading && <CommonLoader size='30' />}
    </StyledUpload>
  );
};

const StyledUpload = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  p {
    font-weight: bold;
    &:not(:first-of-type) {
      color: red;
      margin: 1rem 0;
    }
  }
  label {
    margin-bottom: 0.5rem;
    font-weight: bold;
    span {
      color: red;
    }
  }
  button {
    margin-bottom: 0.5rem;
  }
  svg {
    margin-left: 0.3rem;
    font-size: 0.9rem;
  }
  input {
    height: auto !important;
  }
`;

const UploadButton = styled(mainColorButton)``;

export default ImageUpload;
