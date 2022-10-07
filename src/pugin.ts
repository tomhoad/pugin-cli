#! /usr/bin/env node

import { program } from "commander";
import got from "got";

interface Division {
  Title: string;
}

program
  .command("divisions")
  .description("Displays a list of recent divisions")
  .action(async () => {
    const res = await got.get<Division[]>(
      "https://commonsvotes-api.parliament.uk/data/divisions.json/search",
      { responseType: "json" }
    );

    const divisions = res.body;

    for (const division of divisions) {
      console.log(division.Title);
    }
  });

program.parse();
