// GiMealWrapper.tsx
import React from 'react';
import { GiMeal } from 'react-icons/gi';
import { IconBaseProps } from 'react-icons';

const GiMealWrapper: React.FC<IconBaseProps> = (props) => {
  const IconMealComponent = GiMeal as React.FC<IconBaseProps>;
  return <IconMealComponent {...props} />;
};

export default GiMealWrapper;
