import pub from "./data/pub.json" assert { type: "json" };

let cnt = 0;

for (const { title, id } of pub) {
  const res = await fetch(
    `https://scrapbox.io/api/pages/jigsaw/${encodeURIComponent(title)}`,
  );
  const json = await res.json();
  await Deno.writeTextFile(
    `./data/${id}.json`,
    JSON.stringify({
      id: json.id,
      title: json.title,
      image: json.image,
      created: json.created,
      updated: json.updated,
      lines: json.lines.map((line: any) => ({
        id: line.id,
        text: line.text,
        created: line.created,
        updated: line.updated,
      })),
    }),
  );
  cnt += 1;
  console.log(`${cnt}:${id}.json(${title}) wrote.`);
}

await Deno.writeTextFile("./data/LAST", new Date().getTime().toString());
