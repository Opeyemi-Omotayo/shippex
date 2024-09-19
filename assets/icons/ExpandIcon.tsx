import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const ExpandIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.333}
      d="M9.471 3.167h3.862m0 0v3.862m0-3.862L8.827 7.673m-2.298 6.16H2.667m0 0V9.971m0 3.862 4.506-4.505"
    />
  </Svg>
);

export { ExpandIcon };
