import React from 'react';
import { cssVariables } from '../GlobalStyles';
import Loader from 'react-loader-spinner';

const CommonLoader = ({ size }) => {
  return (
    <Loader
      style={{ textAlign: 'center', margin: 'auto' }}
      type='ThreeDots'
      color={cssVariables.secColorDark}
      height={size}
      width={size}
    />
  );
};

export default CommonLoader;
