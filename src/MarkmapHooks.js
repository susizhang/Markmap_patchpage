import React, { useState, useRef, useEffect } from "react";
import { Transformer } from "markmap-lib";
import { Markmap } from "markmap-view/dist/index.esm";

const transformer = new Transformer();
const initValue = `

# German Words

## beautiful
- useful
## easy
- interactive

## Links

  - <https://markmap.js.org/>
  - [GitHub](https://github.com/markmap/markmap)

## Features

- **inline** ~~text~~ *styles*
- $x = {-b \pm \sqrt{b^2-4ac} \over 2a}$

- This is a very very very very very 
  very very very very very very very very very very long line.
`;

export default function MarkmapHooks() {
  const [value, setValue] = useState(initValue);
  // Ref for SVG element
  const refSvg = useRef();
  // Ref for markmap object
  const refMm = useRef();

  useEffect(() => {
    // Create markmap and save to refMm
    if (refMm.current) return;
    refMm.current = Markmap.create(refSvg.current);
  }, [refSvg.current]);

  useEffect(() => {
    // Update data for markmap once value is changed
    const mm = refMm.current;
    if (!mm) return;
    const { root } = transformer.transform(value);
    mm.setData(root);
    mm.fit();
  }, [refMm.current, value]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      {/* <div className="flex-1">
        <textarea
          className="w-full h-full border border-gray-400"
          value={value}
          onChange={handleChange}
        />
      </div> */}
      <svg className="flex-1" ref={refSvg} />
    </>
  );
}
