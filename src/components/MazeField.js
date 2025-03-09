import { useRef, useState, useEffect } from "preact/hooks";
import { html } from "htm/preact";
import { h } from "preact";
import { Field } from "../data/field";
import { isBlack } from "../data/field_fns";
import { seed2pos, randomPos } from "../util";
import { tooltip } from "../tooltip";
const d3 = require("d3");
const mod = 32;
const Tooltip = tooltip("field_tooltip");

function drawField(pos, cont, pawnscont) {
  // console.log("draw pos", pos);
  d3.select(cont)
    .selectAll("g.field")
    .data(Field)
    .join(
      (enter) => {
        const z = enter.append("g");
        z.attr("class", "field").attr("transform", (d) => {
          return `translate(${(d.x - 1) * mod} ${(d.y - 1) * mod})`;
        });
        z.append("rect")
          .attr("width", mod)
          .attr("height", mod)
          .attr("fill", (d) => (isBlack(d.x, d.y) ? "#eee" : "white"))
          .attr("stroke-width", 1)
          .attr("stroke", "gray");

        z.append("circle")
          .attr("cx", mod / 2)
          .attr("cy", mod / 2)
          .attr("r", (d) => (d.desert ? mod / 4 : 0))
          .attr("fill", (d) => (isBlack(d.x, d.y) ? "white" : "#eee"));

        return z;
      },
      (update) => {
        return update;
      },
      (exit) => exit.remove(),
    );
  d3.select(cont)
    .append("line")
    .attr("stroke-width", 4)
    .attr("stroke", "gray")
    .attr("x1", mod * 5)
    .attr("x2", mod * 5)
    .attr("y1", 0)
    .attr("y2", mod * 6);

  // const pos =  pos;

  d3.select(pawnscont)
    .selectAll("g.pawn")
    .data(pos || [])
    .join(
      (enter) => {
        let z = enter.append("g");
        z.append("circle")
          .attr("cx", mod / 2)
          .attr("cy", mod / 2)
          .attr("fill", "rgba(255,255,255,0.1)")
          .attr("r", mod / 2);
        z.attr("class", "pawn");
        return z;
      },
      (update) => {
        update.selectAll("text").remove();
        return update;
      },
      (exit) => {
        exit.remove();
      },
    )
    .attr("transform", (d) => {
      return `translate(${(d.x - 1) * mod} ${(d.y - 1) * mod})`;
    })
    .attr("data-piece", (d) => {
      // console.log(d);
      return d.piece.name;
    })
    .attr("data-hint", (d) => {
      // console.log(d);
      return d.piece.hint || "?";
    })
    .on("mouseover", (e) => {
      Tooltip.show(e.currentTarget.dataset.hint, e);
    })
    .on("mouseenter", (e) => {
      Tooltip.show(e.currentTarget.dataset.hint, e);
    })
    .on("mouseleave", (_) => Tooltip.hide())
    .append("text")
    .attr("font-family", "inherit")
    .style("user-selectable", "none")
    .attr("font-size", mod / 2)
    .attr("dy", mod / 1.5)
    .attr("dx", mod / 2)
    .attr("text-anchor", "middle")
    .text((d) => d.piece.icon);
}

export function MazeField({ pos }) {
  const FLDS = useRef(null);
  const PWNS = useRef(null);
  //
  useEffect(() => {
    if (!FLDS.current || !PWNS.current) {
      return;
    }
    drawField(pos, FLDS.current, PWNS.current);
  }, [FLDS, FLDS.current, PWNS, PWNS.current, pos]);

  return html`<svg
    class="MazeField"
    viewBox="0 0 ${mod * 10 + 2} ${mod * 6 + 2}"
    style="overflow:visible; display: block"
  >
    <g class="fields" ref=${FLDS}></g>
    <g class="pawns" ref=${PWNS}></g>
  </svg>`;
}
