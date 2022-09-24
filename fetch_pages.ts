import pub from "./data/pub.json" assert { type: "json" };

const last = new Date(parseInt(await Deno.readTextFile("./data/LAST")))
  .getTime();

let cnt = 0;

const updatedPages = pub.filter((page) => page.updated * 1000 > last);

for (const { title, id } of updatedPages) {
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
