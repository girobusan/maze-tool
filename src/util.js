import { Field } from "./data/field";
import { Pieces, oneColorRandom } from "./data/pieces";

var seedrng = require("seedrandom");

function shuffleArray(array, rnd) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(rnd() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

export function seed2pos(seed) {
  const RNG = seedrng(seed);
  const positions = [];
  const Mate = Pieces.filter((e) => e.name == "Mate")[0];
  //white mates
  positions.push({
    x: 1,
    y: 3,
    color: "white",
    piece: Mate,
  });
  positions.push({
    x: 1,
    y: 4,
    color: "white",
    piece: Mate,
  });
  //black mates
  positions.push({
    x: 10,
    y: 3,
    color: "black",
    piece: Mate,
  });
  positions.push({
    x: 10,
    y: 4,
    color: "black",
    piece: Mate,
  });
  //
  //white pieces
  const W = shuffleArray(oneColorRandom.slice(0), RNG);
  const WP = Field.filter((e) => e.type == "start" && e.side == "white");
  WP.forEach((e, i) => {
    positions.push({ x: e.x, y: e.y, color: "white", piece: W[i] });
  });
  //black pieces
  const B = shuffleArray(oneColorRandom.slice(0), RNG);
  const BP = Field.filter((e) => e.type == "start" && e.side == "black");
  BP.forEach((e, i) => {
    positions.push({ x: e.x, y: e.y, color: "black", piece: B[i] });
  });
  return positions;
}
