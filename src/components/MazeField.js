import { useRef, useState, useEffect } from "preact/hooks";
import { html } from "htm/preact";
import { h } from "preact";
import { Field } from "../data/field";
import { isBlack } from "../data/field_fns";
import { seed2pos } from "../util";
const d3 = require("d3");
const mod = 32;

function drawField(cont, module, seedcont, seed) {
  const groups = d3
    .select(cont)
    .selectAll("g.field")
    .data(Field)
    .join(
      (enter) => {
        const z = enter.append("g");
        z.attr("class", "field").attr("transform", (d) => {
          return `translate(${(d.x - 1) * module} ${(d.y - 1) * module})`;
        });
        z.append("rect")
          .attr("width", module)
          .attr("height", module)
          .attr("fill", (d) => (isBlack(d.x, d.y) ? "#eee" : "white"))
          .attr("stroke-width", 1)
          .attr("stroke", "gray");

        return z;
      },
      (update) => {
        return update;
      },
      (exit) => exit.remove(),
    );
  const pos = seed ? seed2pos(seed) : [];

  d3.select(seedcont)
    .selectAll("g.pawn")
    .data(pos)
    .join(
      (enter) => {
        let z = enter.append("g");
        z.attr("class", "pawn");
        return z;
      },
      (update) => {
        update.html("");
        return update;
      },
      (exit) => {
        exit.remove();
      },
    )
    .attr("transform", (d) => {
      return `translate(${(d.x - 1) * module} ${(d.y - 1) * module})`;
    })
    .attr("data-piece", (d) => d.piece.name)
    .append("text")
    .attr("font-family", "system-ui , sans-serif")
    .attr("font-size", mod / 2)
    .attr("dy", mod / 1.5)
    .attr("dx", mod / 2)
    .attr("text-anchor", "middle")
    .text((d) => d.piece.icon);
}

export function MazeField({ seed = "helloy" }) {
  const FLDS = useRef(null);
  const PWNS = useRef(null);
  useEffect(() => {
    if (!FLDS.current || !PWNS.current) {
      return;
    }
    drawField(FLDS.current, mod, PWNS.current, seed);
    console.log(seed2pos(seed));
  }, [FLDS, FLDS.current, PWNS, PWNS.current]);

  return html`<svg
    viewBox="0 0 ${mod * 10 + 2} ${mod * 6 + 2}"
    style="max-width:500px; overflow:visible"
  >
    <g class="fields" ref=${FLDS}></g>
    <g class="pawns" ref=${PWNS}></g>
  </svg>`;
}
