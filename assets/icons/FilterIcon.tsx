import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";

const FilterIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#58536E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6.712 12h11.076M4.25 7h16m-9.846 10h3.692"
    />
  </Svg>
);

export { FilterIcon };
