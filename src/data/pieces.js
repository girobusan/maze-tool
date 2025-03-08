export const Pieces = [
  { name: "Mate", icon: "M", hint: "Mate" },
  { name: "Shadow", icon: "S", hint: "Shadow" },
  { name: "Lighting", icon: "L", hint: "Lighting" },
  { name: "Boulder", icon: "B", hint: "Boulder (Stone)" },
  { name: "Rabbit", icon: "R", hint: "Rabbit (Animal)" },
  { name: "Tree", icon: "T", hint: "Tree" },
  { name: "Time pawn 1", icon: "1", hint: "Time Pawn One" },
  { name: "Time pawn 2", icon: "2", hint: "Time Pawn Two" },
  { name: "Time pawn 3", icon: "3", hint: "Time Pawn Three" },
];

export const oneColorRandom = Pieces.concat(Pieces).filter(
  (e) => e.name != "Mate",
);
