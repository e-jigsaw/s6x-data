import pub from "./data/pub.json";
import { writeFileSync } from "fs";

let dic: any = {};
pub.forEach((article: any) => {
  dic[article.title] = article.id;
});

writeFileSync("./data/dic.json", JSON.stringify(dic));
