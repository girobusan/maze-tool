import {
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "preact/hooks";
import { html } from "htm/preact";
import { h } from "preact";
import { MazeField } from "./MazeField";
import { Legend } from "./Legend";
require("./mazegen.scss");
import {
  seed2pos,
  randomPos,
  easyPosition,
  pos2art,
  encodePosition,
  decodePosition,
  compressPosition,
  uncompressPosition,
} from "../util";

function generateEasy() {
  const pos = easyPosition();
  // console.log(pos);
  console.log(pos2art(pos));
  // return pos;
  return pos;
  // window.location.search = "?" + p;
  // goLoc(p);
  //return uncompressPosition(window.location.search);
}

function copyLnk() {
  const t = window.location;
  navigator.clipboard.writeText(t);
}

function AsciiBlock({ ascii }) {
  console.log(ascii);
  if (!ascii) {
    return "";
  }
  return html`<div class="AsciiBlock">
    <pre>
      ${ascii}
    </pre
    >
  </div>`;
}

export function MazeGenerator() {
  let [locPos, setLocPos] = useState(window.location.search.substring(1));
  let pos = useMemo(() => uncompressPosition(locPos), [locPos]);

  //  useEffect(() => {
  //    console.log("pos", locPos);
  //pos = uncompressPosition(locPos);
  // setPos(checkPos());
  //});

  const posHandler = useCallback((pos_in) => {
    const q = compressPosition(pos_in);
    history.pushState(q, null, "?" + q);
    setLocPos(q);
  });

  return html`<div class="mazegen">
    <h1>“Maze” position viewer/generator</h1>
    <div class="buttons">
      <button onClick=${() => posHandler(randomPos())}>
        Generate random position
      </button>
      <button onClick=${() => posHandler(generateEasy())}>
        Generate easier position
      </button>
      <button onClick=${copyLnk} disabled=${pos ? false : true}>
        Copy link
      </button>
      <button
        onClick=${() =>
      navigator.clipboard.writeText("```\n" + pos2art(pos) + "```\n")}
        disabled=${pos ? false : true}
      >
        Copy ASCII art
      </button>
    </div>
    <${MazeField} pos=${pos} />
    <${AsciiBlock} ascii=${pos ? pos2art(pos) : ""} />
    <${Legend} />
    <p class="copyright">
      © <a href="https://girobusan.github.io">girobusan</a>, 2025
    </p>
  </div>`;
}
