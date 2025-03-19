// GiMealWrapper.tsx
import React from "react";
import { GiMeal as IconMeal } from "react-icons/gi";

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

const GiMealWrapper: React.FC<IconProps> = (props) => {
  return <IconMeal {...props} />;
};

export default GiMealWrapper;
