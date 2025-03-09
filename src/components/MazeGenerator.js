import { useRef, useState, useEffect } from "preact/hooks";
import { html } from "htm/preact";
import { h } from "preact";
import { MazeField } from "./MazeField";
import { Legend } from "./Legend";
require("./mazegen.scss");
import {
  seed2pos,
  randomPos,
  easyPosition,
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
function generateEasy() {
  const pos = easyPosition();
  console.log(pos);
  // return pos;
  const p = compressPosition(pos);
  window.location.search = "?" + p;
  //return uncompressPosition(window.location.search);
}

function copyLnk() {
  const t = window.location;
  navigator.clipboard.writeText(t);
}

function checkPos() {
  if (!window.location.search) {
    return null;
  }
  return uncompressPosition(window.location.search.substring(1));
}

export function MazeGenerator() {
  let pos = checkPos();

  useEffect(() => {
    pos = checkPos();
    // setPos(checkPos());
  });

  return html`<div class="mazegen">
    <h1>“Maze” position viewer/generator</h1>
    <div class="buttons">
      <button onClick=${generate}>Generate random position</button>
      <button onClick=${generateEasy}>Generate easier position</button>
      <button onClick=${copyLnk} disabled=${pos ? false : true}>
        Copy link to this position
      </button>
    </div>
    <${MazeField} pos=${pos} />
    <${Legend} />
    <p class="copyright">
      © <a href="https://girobusan.github.io">girobusan</a>, 2025
    </p>
  </div>`;
}
