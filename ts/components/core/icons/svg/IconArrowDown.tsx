import React from "react";
import { Svg, Path } from "react-native-svg";
import { SVGIconProps } from "../Icon";

const IconArrowDown = ({ size, color }: SVGIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M19.254 7.793c.339.36.365.928.078 1.32l-.078.094-6.589 7a.9.9 0 0 1-1.242.083l-.089-.083-6.588-7a1.045 1.045 0 0 1 0-1.414.9.9 0 0 1 1.242-.083l.09.083L12 14.085l5.923-6.292a.9.9 0 0 1 1.242-.083l.089.083Z"
      fill={color}
    />
  </Svg>
);

export default IconArrowDown;
