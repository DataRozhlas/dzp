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

const result = [
  ...kapitolySorted.map((item: any, index) => {
    return {
      id: item[0],
      name: item[0],
      color: index < 11 ? index : index - 12,
    };
  }),
  ...cleanData.map((item: any) => {
    return { name: item.dotace, parent: item.kapitola, value: item.r23 };
  }),
];

console.log(result);

Deno.writeTextFileSync("data/dotaceProcessed.json", JSON.stringify(result));
