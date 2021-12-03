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
    .map<[string, number]>((pair) => [pair[0], parseInt(pair[1])])
    .map(([command, step]) => {
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
