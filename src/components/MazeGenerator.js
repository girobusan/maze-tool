import { useRef, useState, useEffect } from "preact/hooks";
import { html } from "htm/preact";
import { h } from "preact";
import { MazeField } from "./MazeField";
require("./mazegen.scss");
import { seed2pos, randomPos, encodePosition, decodePosition } from "../util";

export function MazeGenerator() {
  return html`<div class="mazegen">
    <h1>Maze position viewer</h1>
    <${MazeField} />
    <button>Generate random position</button>
  </div>`;
}
