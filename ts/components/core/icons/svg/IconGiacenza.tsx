import React from "react";
import { Svg, Path } from "react-native-svg";
import { SVGIconProps } from "../Icon";

const IconGiacenza = ({ size, color }: SVGIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M18.12 5.433H5.918a.935.935 0 1 0 0 1.868h12.2a.935.935 0 1 0 0-1.868ZM18.12 9.493H5.918a.935.935 0 1 0 0 1.868h12.2a.935.935 0 1 0 0-1.868ZM10.482 13.382H5.92a.935.935 0 1 0 0 1.868h4.563a.935.935 0 1 0 0-1.868Z"
      fill={color}
    />
    <Path
      d="M20.277 0H3.819c-.997 0-1.954.388-2.667 1.083A3.81 3.81 0 0 0 0 3.717v16.47a3.81 3.81 0 0 0 1.118 2.696A3.822 3.822 0 0 0 3.818 24h13.71l6.453-6.386V3.813a3.81 3.81 0 0 0-1.078-2.657A3.822 3.822 0 0 0 20.277 0Zm-2.291 21.407v-2.706a.743.743 0 0 1 .744-.744h2.73l-3.474 3.45Zm.744-4.937a2.255 2.255 0 0 0-2.253 2.23v3.394H3.82a1.91 1.91 0 0 1-1.91-1.907V3.717a1.905 1.905 0 0 1 1.91-1.906h16.458a1.91 1.91 0 0 1 1.91 1.906V16.47H18.73Z"
      fill={color}
    />
  </Svg>
);

export default IconGiacenza;
