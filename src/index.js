import { h, render } from "preact";
import { MazeField } from "./components/MazeField";

console.log("maze positions");

const container = document.querySelector("#mazelevel");

render(h(MazeField), container);
