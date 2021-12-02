import fs from "fs-extra";

const getLine = async () => {
  return await fs.readFile("./input.txt").then((res) => res.toString());
};

const run = async () => {
  const lines = (await getLine()).split("\n");
  const numberedLines = lines.map((lines) => parseInt(lines));

  let windows = [0, 0, 0, 0];
  let increasedCount = 0;

  for (let i = 2; i < numberedLines.length; i++) {
    const current = i % 4;
    windows[current] =
      numberedLines[i - 2] + numberedLines[i - 1] + numberedLines[i];
    if (current === 2 && i !== 2) {
      windows[current] > windows[1] && increasedCount++;
    } else if (current === 3) {
      windows[current] > windows[2] && increasedCount++;
    } else if (current === 0) {
      windows[current] > windows[3] && increasedCount++;
    } else if (current === 1) {
      windows[current] > windows[0] && increasedCount++;
    }
  }

  return increasedCount;
};

run().then((res) => console.log(res));
