import { useRef, useState, useEffect } from "preact/hooks";
import { html } from "htm/preact";
import { h } from "preact";
import { MazeField } from "./MazeField";
require("./mazegen.scss");
import {
  seed2pos,
  randomPos,
  encodePosition,
  decodePosition,
  compressPosition,
  uncompressPosition,
} from "../util";

function generate() {
  const p = compressPosition(randomPos());
  window.location.search = "?" + p;
  return uncompressPosition(window.location.search);
}

function checkPos() {
  if (!window.location.search) {
    return null;
  }
  return uncompressPosition(window.location.search.substring(1));
}

export function MazeGenerator() {
  let [pos, setPos] = useState(checkPos());

  useEffect(() => {
    // setPos(checkPos());
  });

  return html`<div class="mazegen">
    <h1>Maze position viewer</h1>
    <${MazeField} pos=${pos} />
    <button onClick=${generate}>Generate random position</button>
  </div>`;
}
