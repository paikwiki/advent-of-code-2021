import fs from "fs-extra";

const getLine = async () => {
  return await fs.readFile("./input.txt").then((res) => res.toString());
};

const run = async () => {
  let horizon = 0;
  let vertical = 0;
  const result = (await getLine())
    .split("\n")
    .map((line) => line.split(" "))
    .map((pair) => [pair[0], pair[1]])
    .map(([command, stepString]) => {
      const step: number = parseInt(stepString);
      switch (command) {
        case "up":
          vertical -= step;
          return;
        case "down":
          vertical += step;
          return;
        case "forward":
          horizon += step;
          return;
      }
    });
  return horizon * vertical;
};

run().then((res) => console.log(res));
