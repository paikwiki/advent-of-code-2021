import { getLines } from "./utils";

type BingoBoard = { value: string; marked: boolean }[][];

const bingoBoardTemplate = [
  [
    { value: "0", marked: false },
    { value: "0", marked: false },
    { value: "0", marked: false },
    { value: "0", marked: false },
    { value: "0", marked: false },
  ],
  [
    { value: "0", marked: false },
    { value: "0", marked: false },
    { value: "0", marked: false },
    { value: "0", marked: false },
    { value: "0", marked: false },
  ],
  [
    { value: "0", marked: false },
    { value: "0", marked: false },
    { value: "0", marked: false },
    { value: "0", marked: false },
    { value: "0", marked: false },
  ],
  [
    { value: "0", marked: false },
    { value: "0", marked: false },
    { value: "0", marked: false },
    { value: "0", marked: false },
    { value: "0", marked: false },
  ],
  [
    { value: "0", marked: false },
    { value: "0", marked: false },
    { value: "0", marked: false },
    { value: "0", marked: false },
    { value: "0", marked: false },
  ],
];

const run = async () => {
  const [instruction, ...linesForBingoBoard] = await getLines(
    "./input.txt"
  ).then((lines) => [
    lines[0],
    ...lines.slice(2).filter((line) => line.length !== 0),
  ]);

  // init bingoBoards
  const bingoBoardCount = Math.floor(linesForBingoBoard.length / 5);
  console.log("bingoBoardCount", bingoBoardCount);

  const bingoBoards: BingoBoard[] = [];
  for (let idx = 0; idx < bingoBoardCount; idx++) {
    bingoBoards.push(JSON.parse(JSON.stringify(bingoBoardTemplate)));
  }
  console.log(bingoBoards);

  // set bingoBoards
  for (let idx = 0; idx < linesForBingoBoard.length; idx++) {
    const board = Math.floor(idx / 5);
    const line = idx % 5;
    bingoBoards[board][line] = linesForBingoBoard[idx]
      .split(" ")
      .filter((value) => value.length !== 0)
      .map((value) => ({ value, marked: false }));
  }
  return bingoBoards;
};

run().then((res) => console.log(JSON.stringify(res, null, 2)));
