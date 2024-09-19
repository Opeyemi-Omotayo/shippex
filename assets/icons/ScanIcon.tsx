import * as React from "react";
import Svg, { SvgProps, G, Path, Defs, ClipPath } from "react-native-svg";

const ScanIcon = (props: SvgProps) => (
  <Svg width={32} height={25} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={props.color}
        d="M.785 0h4.722v1.226h-4.11v3.205H.172V.613C.171.276.447 0 .785 0Zm4.003 4.181h2.128V20.82H4.788V4.18Zm13.265 0h1.52V20.82h-1.52V4.18Zm-2.945 0h1.14V20.82h-1.14V4.18Zm-6.386 0h.647V20.82h-.647V4.18Zm16.591 0h1.899V20.82h-1.899V4.18Zm-3.934 0h2.128V20.82H21.38V4.18Zm-10.204 0h2.128V20.82h-2.128V4.18ZM1.398 20.57v3.205h4.109V25H.785a.613.613 0 0 1-.614-.613v-3.818h1.227ZM26.81 0h4.405c.338 0 .613.276.613.613v3.818h-1.226V1.226H26.81V0Zm5.018 20.569v3.818a.615.615 0 0 1-.613.613H26.81v-1.226h3.792v-3.205h1.226Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.171 0h31.657v25H.171z" />
      </ClipPath>
    </Defs>
  </Svg>
);

const ScanOutlineIcon = (props: SvgProps) => (
  <Svg width={32} height={25} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill={props.color}
        d="M.785 0h4.722v1.226h-4.11v3.205H.172V.613C.171.276.447 0 .785 0Zm4.003 4.181h2.128V20.82H4.788V4.18Zm13.265 0h1.52V20.82h-1.52V4.18Zm-2.945 0h1.14V20.82h-1.14V4.18Zm-6.386 0h.647V20.82h-.647V4.18Zm16.591 0h1.899V20.82h-1.899V4.18Zm-3.934 0h2.128V20.82H21.38V4.18Zm-10.204 0h2.128V20.82h-2.128V4.18ZM1.398 20.57v3.205h4.109V25H.785a.613.613 0 0 1-.614-.613v-3.818h1.227ZM26.81 0h4.405c.338 0 .613.276.613.613v3.818h-1.226V1.226H26.81V0Zm5.018 20.569v3.818a.615.615 0 0 1-.613.613H26.81v-1.226h3.792v-3.205h1.226Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.171 0h31.657v25H.171z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export { ScanIcon, ScanOutlineIcon };
