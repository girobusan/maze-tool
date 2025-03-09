import { h, render } from "preact";
import { MazeGenerator } from "./components/MazeGenerator";

const container = document.querySelector("#mazelevel");

render(h(MazeGenerator), container);
