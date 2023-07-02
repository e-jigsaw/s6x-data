import { readFile, writeFile } from "fs/promises";
import { addDays, format } from "date-fns";
import { parse } from "@progfay/scrapbox-parser";

const main = async () => {
  const dic = JSON.parse((await readFile("./data/dic.json")).toString());
  const days = [];
  for (let i = 0; i <= 365; i++) {
    days.push(format(addDays(new Date(2000, 0, 1), i), "MMdd"));
  }
  const res: any = {};
  for (const day of days) {
    const json = JSON.parse(
      (await readFile(`./data/${dic[day]}.json`)).toString(),
    );
    const raw = json.lines.reduce((prev: string, curr: any) => {
      return prev + `${curr.text}\n`;
    }, "");
    const parsed = parse(raw);
    res[day] = {};
    if (parsed.length > 4) {
      res[day] = parsed.slice(4).reduce<{ res: any; year: string | null }>(
        (prev, curr) => {
          if (curr.type === "line") {
            if (curr.indent === 0) {
              if (curr.nodes.length === 0) {
                return prev;
              }
              if (curr.nodes[0].type === "link") {
                return {
                  res: { ...prev.res, [curr.nodes[0].href]: [] },
                  year: curr.nodes[0].href,
                };
              }
            } else if (curr.indent === 1) {
              if (prev.year !== null) {
                if (curr.nodes.length === 0) {
                  return prev;
                }
                if (curr.nodes[0].type === "link") {
                  return {
                    ...prev,
                    res: {
                      ...prev.res,
                      [prev.year]: [...prev.res[prev.year], {
                        title: curr.nodes[0].href,
                        id: dic[curr.nodes[0].href],
                      }],
                    },
                  };
                }
              }
            }
          }
          return prev;
        },
        { res: {}, year: null },
      ).res;
    }
  }
  await writeFile("./gen/yearly.json", JSON.stringify(res));
};

main();
