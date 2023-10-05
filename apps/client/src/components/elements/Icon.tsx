import React from 'react';
import Avocade from '/assets/icons/avocado.svg';

const iconTypes = {
  fire: Fire,
  healthy: Healthy,
  home: Home,
};

const IconComponent = ({ name, ...props }) => {
  const Icon = iconTypes[name];
  return <Icon {...props} />;
};
