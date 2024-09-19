import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const AddScanIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="M9.55 2.4H5.283A2.133 2.133 0 0 0 3.15 4.533V8.8m6.4 12.8H5.283a2.133 2.133 0 0 1-2.133-2.133V15.2m12.8-12.8h4.267c1.178 0 2.133.955 2.133 2.133V8.8m0 6.4v4.267a2.133 2.133 0 0 1-2.133 2.133H15.95M3.15 12h19.2"
    />
  </Svg>
);

export { AddScanIcon };
