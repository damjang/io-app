import React from "react";
import { Svg, Path } from "react-native-svg";
import { SVGIconProps } from "../Icon";

const IconGallery = ({ size, color }: SVGIconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path
      d="M21.75 4.5H5.25C3.59925 4.5 3 5.8455 3 6.75V20.25C3 21.9007 4.3455 22.5 5.25 22.5H21.75C23.4007 22.5 24 21.1545 24 20.25V6.75C24 5.09925 22.6545 4.5 21.75 4.5ZM4.5 6.759C4.509 6.4125 4.64625 6 5.25 6H21.741C22.0875 6.009 22.5 6.14625 22.5 6.75V12C20.2253 12 19.1115 13.3492 18.1305 14.5395C17.2268 15.6352 16.5127 16.5 15 16.5C14.1247 16.5 13.5225 16.0478 12.825 15.525C12.0285 14.9273 11.1247 14.25 9.75 14.25C8.37525 14.25 7.4715 14.9273 6.675 15.525C5.9775 16.0478 5.37525 16.5 4.5 16.5V6.759ZM22.5 20.241C22.491 20.5875 22.3545 21 21.75 21H5.259C4.9125 20.991 4.5 20.8545 4.5 20.25V18C5.87475 18 6.7785 17.3227 7.575 16.725C8.2725 16.2022 8.87475 15.75 9.75 15.75C10.6253 15.75 11.2275 16.2022 11.925 16.725C12.7222 17.3227 13.6253 18 15 18C17.2193 18 18.318 16.6688 19.287 15.4935C20.1705 14.4233 20.9317 13.5 22.5 13.5V20.241ZM18 3H2.25C1.64625 3 1.509 3.4125 1.5 3.759V16.5C1.5 16.9147 1.164 17.25 0.75 17.25C0.336 17.25 0 16.9147 0 16.5V3.75C0 2.8455 0.59925 1.5 2.25 1.5H18C18.4147 1.5 18.75 1.836 18.75 2.25C18.75 2.664 18.4147 3 18 3ZM10.5 9.75C10.5 8.5095 9.4905 7.5 8.25 7.5C7.0095 7.5 6 8.5095 6 9.75C6 10.9905 7.0095 12 8.25 12C9.4905 12 10.5 10.9905 10.5 9.75ZM7.5 9.75C7.5 9.33675 7.83675 9 8.25 9C8.66325 9 9 9.33675 9 9.75C9 10.1632 8.66325 10.5 8.25 10.5C7.83675 10.5 7.5 10.1632 7.5 9.75Z"
      fill={color}
    />
  </Svg>
);

export default IconGallery;
