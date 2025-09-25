const STEP1_TOTAL = 183_800;
const participants1 = ["어진", "재욱", "준호", "자원"];
const share1 = STEP1_TOTAL / participants1.length; // 45,950
console.log("share1 =", share1);


const STEP2_TOTAL = 756_940;
const participants2 = ["어진", "재욱", "준호", "자원", "준엽"];
const share2 = STEP2_TOTAL / participants2.length; // 151,388
console.log("share2 =", share2);


const extra = { 어진: 18_000, 재욱: 18_000, 준호: 18_000, 자원: 27_000, 준엽: 18_000 };

const STEP1_EXTRA_COST = 24_600;
const add1_split = STEP1_EXTRA_COST / participants1.length; // 6,150
console.log("add1_split =", add1_split);

const names = [...new Set([...participants2])]; // all unique names
const totals = {};
for (const name of names) {
  let t = 0;

    if (participants1.includes(name)) {
    t += share1 + add1_split;
    }

     t += share2;
     t += extra[name] ?? 0;
    totals[name] = t;
}
