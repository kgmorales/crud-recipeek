import React from 'react';
import ListCheck from '@public/assets/icons/list-check.svg';
import StopWatch from '@public/assets/icons/stopwatch.svg';

interface IconType {
  [key: string]: React.FC<React.SVGProps<SVGSVGElement>>;
}

const iconTypes: IconType = {
  ingredients: ListCheck,
  stopWatch: StopWatch,
};

interface IconProps {
  name: keyof typeof iconTypes;
}

const IconComponent: React.FC<IconProps> = ({ name, ...props }) => {
  const Icon = iconTypes[name];
  if (!Icon) return null;

  return <Icon {...props} />;
};

export default IconComponent;
