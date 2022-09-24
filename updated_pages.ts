import pub from "./data/pub.json" assert { type: "json" };

const last = new Date(parseInt(await Deno.readTextFile("./data/LAST")))
  .getTime();
export const updatedPages = pub.filter((page) => page.updated * 1000 > last);
