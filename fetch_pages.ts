import { updatedPages } from "./updated_pages";
import { writeFile } from "fs/promises";

let cnt = 0;

const main = async () => {
  for (const { title, id } of updatedPages) {
    const res = await fetch(
      `https://scrapbox.io/api/pages/jigsaw/${encodeURIComponent(title)}`,
    );
    const json = await res.json();
    await writeFile(
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
    console.log(`(${cnt}/${updatedPages.length}):${id}.json(${title}) wrote.`);
  }
};

main();
