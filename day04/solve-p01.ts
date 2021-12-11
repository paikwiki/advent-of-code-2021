import { getLines } from "./utils";

type BingoBoard = { value: string; marked: boolean }[][];

const initBingoRaw = () => {
  const raw = [];
  for (let idx = 0; idx < 5; idx++) {
    raw[idx] = { value: "0", marked: false };
  }
  return raw;
};

const run = async () => {
  const [instruction, ...linesForBingoBoard] = await getLines(
    "./input.txt"
  ).then((lines) => [
    lines[0],
    ...lines.slice(2).filter((line) => line.length !== 0),
  ]);

  // init bingoBoards
  const bingoBoardCount = Math.floor(linesForBingoBoard.length / 5);

  const bingoBoardTemplate: BingoBoard = [];
  for (let rawIndex = 0; rawIndex < 5; rawIndex++) {
    bingoBoardTemplate[rawIndex] = initBingoRaw();
  }

  let bingoBoards: BingoBoard[] = [];
  for (let idx = 0; idx < bingoBoardCount; idx++) {
    bingoBoards.push(JSON.parse(JSON.stringify(bingoBoardTemplate)));
  }

  // set bingoBoards
  for (let idx = 0; idx < linesForBingoBoard.length; idx++) {
    const board = Math.floor(idx / 5);
    const line = idx % 5;
    bingoBoards[board][line] = linesForBingoBoard[idx]
      .split(" ")
      .filter((value) => value.length !== 0)
      .map((value) => ({ value, marked: false }));
  }

  // check
  for (const calledNumber of instruction.split(",")) {
    bingoBoards = bingoBoards.map((bingoBoard) =>
      bingoBoard.map((bingoRaw) =>
        bingoRaw.map((item) =>
          item.value === calledNumber ? { ...item, marked: true } : item
        )
      )
    );

    let isBingo = false;
    let winner = -1;

    // check each raw
    bingoBoards.map((bingoBoard, index) =>
      bingoBoard.map((bingoRaw) => {
        const trueItems = bingoRaw.filter((item) => item.marked);
        if (trueItems.length === 5) {
          isBingo = true;
          winner = index;
        }
      })
    );

    // check each column
    !isBingo &&
      bingoBoards.map((bingoBoard, index) => {
        const columnTrueItems = [0, 1, 2, 3, 4].map((columnNumber) =>
          bingoBoard.filter((bingoRaw) => bingoRaw[columnNumber].marked)
        );
        columnTrueItems.map((col) => {
          if (col.length === 5) {
            isBingo = true;
            winner = index;
          }
        });
      });

    // check diagonal
    !isBingo &&
      bingoBoards.map((bingoBoard, index) => {
        if (
          (bingoBoard[0][0].marked &&
            bingoBoard[1][1].marked &&
            bingoBoard[2][2].marked &&
            bingoBoard[3][3].marked &&
            bingoBoard[4][4].marked) ||
          (bingoBoard[0][4].marked &&
            bingoBoard[1][3].marked &&
            bingoBoard[2][2].marked &&
            bingoBoard[3][1].marked &&
            bingoBoard[4][0].marked)
        ) {
          isBingo = true;
          winner = index;
        }
      });

    if (isBingo)
      return (
        parseInt(calledNumber) *
        bingoBoards[winner].reduce(
          (acc, bingoRaw) =>
            (acc += bingoRaw.reduce(
              (rawAcc, item) =>
                item.marked ? rawAcc : (rawAcc += parseInt(item.value)),
              0
            )),
          0
        )
      );
  }
};

run().then((res) => console.log(JSON.stringify(res, null, 2)));
