import { writeFileSync } from "fs";

writeFileSync("./data/LAST", new Date().getTime().toString());
