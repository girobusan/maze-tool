import { h, render } from "preact";
import { MazeGenerator } from "./components/MazeGenerator";

console.log("maze positions");

const container = document.querySelector("#mazelevel");

render(h(MazeGenerator), container);
