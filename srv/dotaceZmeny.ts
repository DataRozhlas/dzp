// deno-lint-ignore-file no-explicit-any
const data = JSON.parse(Deno.readTextFileSync("data/dotace.json"));

const cleanData = data.map((item: any) => {
  return {
    ...item,
    r23:
      item.r23 === ""
        ? 0
        : parseInt(item.r23.replaceAll(" ", "").replaceAll(",", "")),
    r24:
      item.r24 === ""
        ? 0
        : parseInt(item.r24.replaceAll(" ", "").replaceAll(",", "")),
    r25:
      item.r25 === ""
        ? 0
        : parseInt(item.r25.replaceAll(" ", "").replaceAll(",", "")),
  };
});

const kapitoly = cleanData.reduce((acc: any, item: any) => {
  if (acc[item.kapitola]) {
    acc[item.kapitola] += item.r23;
  } else {
    acc[item.kapitola] = item.r23;
  }
  return acc;
}, {});

const kapitolySorted = Array.from(Object.entries(kapitoly)).sort(
  (a: any, b: any) => b[1] - a[1]
);

const result = ["r23", "r24", "r25"].map((key) => {
  return [
    `rok 20${key.substring(1)}`,
    ...kapitolySorted.map((item) => {
      const dotace = cleanData.filter((row: any) => row.kapitola === item[0]);
      const dotaceSum = dotace.reduce((acc: any, item: any) => {
        return acc + item[key];
      }, 0);
      return dotaceSum;
    }),
  ];
});

console.log(result);

Deno.writeTextFileSync("data/dotaceZmeny.json", JSON.stringify(result));
