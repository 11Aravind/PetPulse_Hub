import React from 'react';
import PropTypes from 'prop-types';

export const Loader = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    xs: 'h-4 w-4',
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  return (
    <div className={`inline-block ${sizeClasses[size] || sizeClasses.md} ${className}`}>
      <div className="animate-spin rounded-full h-full w-full border-b-2 border-gray-900"></div>
    </div>
  );
};

Loader.propTypes = {
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
};

export default Loader;
