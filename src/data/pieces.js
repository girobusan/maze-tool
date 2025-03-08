export const Pieces = [
  { name: "Mate", icon: "M", hint: "Mate", code: 0 },
  { name: "Shadow", icon: "S", hint: "Shadow", code: 1 },
  { name: "Lighting", icon: "L", hint: "Lighting", code: 2 },
  { name: "Boulder", icon: "B", hint: "Boulder (Stone)", code: 3 },
  { name: "Rabbit", icon: "R", hint: "Rabbit (Animal)", code: 4 },
  { name: "Tree", icon: "T", hint: "Tree", code: 5 },
  { name: "Time pawn 1", icon: "1", hint: "Time Pawn One", code: 6 },
  { name: "Time pawn 2", icon: "2", hint: "Time Pawn Two", code: 7 },
  { name: "Time pawn 3", icon: "3", hint: "Time Pawn Three", code: 8 },
];

export const oneColorRandom = Pieces.concat(Pieces).filter(
  (e) => e.name != "Mate",
);
