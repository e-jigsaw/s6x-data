import pub from "./data/pub.json" assert { type: "json" };

let dic: any = {};
pub.forEach((article: any) => {
  dic[article.title] = article.id;
});

await Deno.writeTextFile("./data/dic.json", JSON.stringify(dic));
