import pub from "./data/pub.json";
import { readFileSync } from "fs";

const last = new Date(parseInt(readFileSync("./data/LAST").toString()))
  .getTime();
export const updatedPages = pub.filter((page) => page.updated * 1000 > last);
