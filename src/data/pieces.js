export const Pieces = [
  { name: "Mate", icon: "M" },
  { name: "Shadow", icon: "S" },
  { name: "Lighting", icon: "L" },
  { name: "Boulder", icon: "B" },
  { name: "Rabbit", icon: "R" },
  { name: "Tree", icon: "T" },
  { name: "Time pawn 1", icon: "1" },
  { name: "Time pawn 2", icon: "2" },
  { name: "Time pawn 3", icon: "3" },
];

export const oneColorRandom = Pieces.concat(Pieces).filter(
  (e) => e.name != "Mate",
);
