import { readFile, writeFile } from "fs/promises";
import {format, subDays, getHours} from "date-fns";
import master from "./data/pub.json";

const PATH = "./data/COUNT";

const main = async () => {
  const prevCount = parseInt((await readFile(PATH)).toString());
  const count = master.reduce((prev, curr) => (prev += curr.views), 0);
  const diff = count - prevCount;
  const headers = new Headers();
  headers.append("X-USER-TOKEN", process.env.PIXE_LA_TOKEN as string);
  const res = await fetch("https://pixe.la/v1/users/jgs/graphs/sbv", {
    headers,
    method: "POST",
    body: JSON.stringify({
      date: format(
        subDays(new Date(), getHours(new Date()) === 19 ? 0 : 1),
        "yyyyMMdd",
      ),
      quantity: diff.toString(),
    }),
  });
  const json = await res.json();
  console.log(json);
  console.log(`Today views: ${diff}`);
  console.log(`Total views: ${count}`);
  await writeFile(PATH, count.toString());
};

main();
