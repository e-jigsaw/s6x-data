import { createClient } from "@supabase/supabase-js";
import { updatedPages } from "./updated_pages";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET!,
);

type RawPage = {
  id: string;
  title: string;
  created: number;
  updated: number;
  image: string | null;
};

const main = async () => {
  const { data, error } = await supabase.from("pages").upsert(
    (updatedPages as RawPage[]).map((
      { id, title, created, updated, image },
    ) => ({
      id,
      title,
      created: new Date(created * 1000),
      updated: new Date(updated * 1000),
      image,
    })),
  );

  console.log(data, error);
  process.exit();
};

main();
