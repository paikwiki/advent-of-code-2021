import fs from "fs-extra";

const getLines = async (path: string) => {
  return (await fs.readFile(path).then((res) => res.toString())).split("\n");
};

export { getLines };