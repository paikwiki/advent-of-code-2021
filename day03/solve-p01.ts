import fs from "fs-extra";

interface BitCount {
  zero: number;
  one: number;
}

const getLines = async () => {
  return await fs.readFile("./input.txt").then((res) => res.toString());
};

const initBitCount = (len: number) => {
  const counter = [];

  for (let i = 0; i < len; i++) {
    counter[i] = {
      zero: 0,
      one: 0,
    };
  }
  return counter;
};

const getMostCommonBits = (eachBitCounts: BitCount[]) => {
  return eachBitCounts.map((bit) => (bit.zero > bit.one ? "0" : "1")).join("");
};

const run = async () => {
  const diagnosticReports = (await getLines()).split("\n");
  const eachBitCounts = initBitCount(diagnosticReports[0].length);

  diagnosticReports.map((report) =>
    report
      .split("")
      .map((eachBit, index) =>
        eachBit === "0"
          ? (eachBitCounts[index].zero += 1)
          : (eachBitCounts[index].one += 1)
      )
  );

  const gammaRate = getMostCommonBits(eachBitCounts);
  const epsilonRate = gammaRate
    .split("")
    .map((bit) => (bit === "1" ? "0" : "1"))
    .join("");

  return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
};

run().then((res) => console.log(res));
