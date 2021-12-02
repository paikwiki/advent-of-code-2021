import fs from "fs-extra";

const getLine = async () => {
  return await fs.readFile("./input.txt").then((res) => res.toString());
};

const run = async () => {
  const lines = (await getLine()).split("\n");
  let previous: number | null = null;
  let increasedCount = 0;

  for (const line of lines) {
    const current = parseInt(line);
    if (previous === null) {
      previous = current;
      continue;
    }
    if (previous && current > previous) increasedCount++;
    previous = current;
  }
  return increasedCount;
};

run().then((res) => console.log(res));
