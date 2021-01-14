import React from 'react';
import { cssVariables } from '../GlobalStyles';
import LaderIcon from 'react-loader-spinner';

const Loader = ({ size }) => {
  return (
    <LaderIcon
      style={{ textAlign: 'center', margin: 'auto' }}
      type='ThreeDots'
      color={cssVariables.secColorDark}
      height={size}
      width={size}
    />
  );
};

export default Loader;
