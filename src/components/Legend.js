import { html } from "htm/preact";
import { Pieces } from "../data/pieces";

export function Legend() {
  return html`<div class="Legend">
    ${Pieces.map(
      (e) =>
        html`<div class="legend_unit">
          <strong>${e.icon}</strong> — ${e.hint}
        </div>`,
    )}
  </div>`;
}
