export const Pieces = [
  { name: "Mate", icon: "M", hint: "Mate", code: 0, singleColor: true },
  { name: "Shadow", icon: "S", hint: "Shadow", code: 1, singleColor: false },
  { name: "Lighting", icon: "L", hint: "Lighting", code: 2, singleColor: true },
  {
    name: "Boulder",
    icon: "B",
    hint: "Boulder (Stone)",
    code: 3,
    singleColor: true,
  },
  { name: "Rabbit", icon: "R", hint: "Rabbit", code: 4, singleColor: true },
  { name: "Tree", icon: "T", hint: "Tree", code: 5, singleColor: false },
  {
    name: "Time pawn 1",
    icon: "1",
    hint: "Time Pawn I",
    code: 6,
    singleColor: false,
  },
  {
    name: "Time pawn 2",
    icon: "2",
    hint: "Time Pawn II",
    code: 7,
    singleColor: true,
  },
  {
    name: "Time pawn 3",
    icon: "3",
    hint: "Time Pawn III",
    code: 8,
    singleColor: false,
  },
];

export const oneColorRandom = Pieces.concat(Pieces).filter(
  (e) => e.name != "Mate",
);
