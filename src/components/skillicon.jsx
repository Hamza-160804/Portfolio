import React from 'react';

const SkillIcon = ({ iconClass }) => {
  return (
    <i 
      className={`text-2xl text-white ${iconClass}`} 
      aria-hidden="true"
    />
  );
};

export default SkillIcon;