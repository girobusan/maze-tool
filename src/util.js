import { Field } from "./data/field";
import { Pieces, oneColorRandom } from "./data/pieces";
import { isBlack } from "./data/field_fns";
import makeArt from "./ascii";

const pieceDict = Pieces.reduce((a, e) => {
  a[e.icon] = e;
  return a;
}, {});

const mates = [
  {
    x: 1,
    y: 3,
    color: "white",
    piece: pieceDict.M,
  },
  {
    x: 1,
    y: 4,
    color: "white",
    piece: pieceDict.M,
  },
  {
    x: 10,
    y: 3,
    color: "black",
    piece: pieceDict.M,
  },
  {
    x: 10,
    y: 4,
    color: "black",
    piece: pieceDict.M,
  },
];

var seedrng = require("seedrandom");

function shuffleArray(array_in, rnd) {
  let array = array_in.slice(0);
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
  // const Mate = Pieces.filter((e) => e.name == "Mate")[0];
  mates.forEach((m) => positions.push(m));
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

function pieces2fields(pcs, flds, color) {
  if (pcs.length != flds.length) {
    console.log("Wrong number of something", pcs, flds);
  }
  return flds.map((e, i) => {
    // console.log(
    //   color,
    //   "Piece",
    //   pcs[i].icon,
    //   "on",
    //   isBlack(e.x, e.y) ? "black" : "white",
    //   `${e.x}:${e.y}`,
    // );
    return { x: e.x, y: e.y, color: color || e.side, piece: pcs[i] };
  });
}

export function encodePosition(pos) {
  return pos
    .map((e) => `${p.piece.icon}:${p.color.substring(0, 1)}:${p.x}:${p.y}`)
    .join(",");
}

export function decodePosition(str) {
  return str.split(",").map((e) => {
    let vals = e.split(":");
    return {
      x: +vals[2],
      y: +vals[3],
      color: vals[1] == "b" ? "black" : "white",
      piece: pieceDict[vals[0]],
    };
  });
}
export function compressPosition(pos) {
  return pos
    .sort((a, b) => {
      if (a.x > b.x) {
        return 1;
      }
      if (a.x < b.x) {
        return -1;
      }
      // if x's are equal...
      if (a.y > b.y) {
        return 1;
      }
      if (a.y < b.y) {
        return -1;
      }
      //
      return 0;
    })
    .map((e) => e.piece.icon)
    .filter((e) => e != "M")
    .join("");
}

export function uncompressPosition(str) {
  const starts = Field.filter((e) => e.type == "start");
  const pcs = str.toUpperCase().split("");

  let position = [];
  mates.forEach((m) => position.push(m));
  starts.forEach((f, i) => {
    // console.log(pcs[i], pieceDict[pcs[i]]);
    position.push({ x: f.x, y: f.y, color: f.side, piece: pieceDict[pcs[i]] });
  });
  return position;
}

export function randomPos() {
  return seed2pos(Math.random());
}

export function easyPosition() {
  let positions = [];
  positions.info = "Easier one";
  mates.forEach((m) => positions.push(m));
  //half pieces, no mates
  const halfPieces = Pieces.filter((e) => e.icon != "M");
  //
  //whites
  //// black fields
  const whites_black = Field.filter((f) => f.side == "white")
    .filter((f) => isBlack(f.x, f.y))
    .filter((f) => f.type == "start");
  //
  const whites_white = Field.filter((f) => f.side == "white")
    .filter((f) => !isBlack(f.x, f.y))
    .filter((f) => f.type == "start");
  //shuffle 1
  const white_on_black = shuffleArray(halfPieces, Math.random);
  positions = positions.concat(
    pieces2fields(white_on_black, whites_black, "white"),
  );
  //sguffle 2
  const white_on_white = shuffleArray(halfPieces, Math.random);
  positions = positions.concat(
    pieces2fields(white_on_white, whites_white, "white"),
  );
  //
  //blacks
  //// black fields
  const blacks_black = Field.filter((f) => f.side == "black")
    .filter((f) => isBlack(f.x, f.y))
    .filter((f) => f.type == "start");
  //
  const blacks_white = Field.filter((f) => f.side == "black")
    .filter((f) => !isBlack(f.x, f.y))
    .filter((f) => f.type == "start");
  //shuffle 1
  const black_on_black = shuffleArray(halfPieces, Math.random);
  positions = positions.concat(
    pieces2fields(black_on_black, blacks_black, "black"),
  );
  //sguffle 2
  const black_on_white = shuffleArray(halfPieces, Math.random);
  positions = positions.concat(
    pieces2fields(black_on_white, blacks_white, "black"),
  );
  //
  console.log("Generated", positions);
  return positions;
}

export function pos2art(pos) {
  const xs = [5, 6].map((e) => e - 1);
  const ys = [1, 2, 3, 4, 5, 6].map((e) => e - 1);
  let art = makeArt();
  pos.forEach((e) => art.add((e.x - 1) * 2, e.y - 1, e.piece.icon));
  ys.forEach((y) => {
    xs.forEach((x) => art.add(x * 2, y, "."));
  });
  return art.toString();
}
