import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const BellIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#2F50C1"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.333 20.09c.708.566 1.643.91 2.667.91a4.268 4.268 0 0 0 2.667-.91m-10.16-2.908c-.421 0-.656-.663-.401-1.03.591-.855 1.163-2.107 1.163-3.615l.024-2.185C5.293 6.292 8.296 3 12 3c3.759 0 6.806 3.34 6.806 7.46l-.025 2.077c0 1.518.552 2.778 1.12 3.632.245.369.009 1.013-.408 1.013H4.508Z"
    />
  </Svg>
);
export { BellIcon };
