import { Callout, IllustrationFrame, Line, Path } from './Illustration';

/** Three-quarter view of thick-rimmed wayfarer-style smart glasses. */
export default function GlassesIllustration({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <IllustrationFrame
      viewBox="0 0 420 260"
      title="Untether smart glasses — camera, microphone array and lens display"
      className={className}
      style={style}
    >
      {/* Left (near) lens — outer rim + inner rim for thickness */}
      <Path d="M55 100 Q55 91 66 90 L156 87 Q168 87 167 99 L165 150 Q164 165 150 166 L74 171 Q60 171 58 156 Z" />
      <Path d="M65 102 Q65 96 73 95 L152 93 Q160 93 159 101 L157 147 Q156 158 146 159 L79 163 Q69 163 67 152 Z" />

      {/* Right (far) lens — foreshortened */}
      <Path d="M205 99 Q205 91 214 90 L288 89 Q298 89 297 99 L295 145 Q294 157 283 158 L222 160 Q210 160 208 149 Z" />
      <Path d="M214 101 Q214 95 221 95 L283 94 Q291 94 290 101 L288 142 Q287 151 278 152 L227 153 Q217 153 216 145 Z" />

      {/* OLED display region on the inner edge of the right lens */}
      <Path d="M223 106 Q223 102 228 102 L246 101 Q251 101 250 106 L249 138 Q248 143 243 143 L228 144 Q223 144 223 139 Z" />
      <Line x1="227" y1="114" x2="245" y2="113" />
      <Line x1="227" y1="122" x2="245" y2="121" />
      <Line x1="227" y1="130" x2="240" y2="129" />

      {/* Bridge (double bar) */}
      <Path d="M167 100 Q186 92 205 100" />
      <Path d="M170 110 Q186 104 203 111" />

      {/* Left temple toward the viewer + hinge */}
      <Line x1="58" y1="106" x2="22" y2="122" />
      <Line x1="22" y1="122" x2="14" y2="150" />
      <circle className="u-illus-line" data-draw pathLength={1} cx="58" cy="106" r="4" />

      {/* Right temple away from the viewer + hinge (camera housing) */}
      <Line x1="296" y1="102" x2="332" y2="96" />
      <Line x1="332" y1="96" x2="348" y2="112" />
      <circle className="u-illus-line" data-draw pathLength={1} cx="298" cy="101" r="4.5" />
      <circle className="u-illus-line" data-draw pathLength={1} cx="298" cy="101" r="1.6" />

      {/* Mic array — a row of ports on the left temple */}
      <circle className="u-illus-line" data-draw pathLength={1} cx="30" cy="119" r="1.4" />
      <circle className="u-illus-line" data-draw pathLength={1} cx="27" cy="127" r="1.4" />
      <circle className="u-illus-line" data-draw pathLength={1} cx="24" cy="135" r="1.4" />

      <Callout point={[300, 100]} elbow={[336, 58]} labelPos={[340, 60]} label="12MP CAMERA" />
      <Callout point={[28, 130]} elbow={[26, 224]} labelPos={[20, 226]} label="MIC ARRAY" />
      <Callout
        point={[240, 120]}
        elbow={[240, 224]}
        labelPos={[240, 226]}
        anchor="middle"
        label="OLED LENS DISPLAY"
      />
    </IllustrationFrame>
  );
}
