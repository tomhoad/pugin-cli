#! /usr/bin/env node

import { program } from "commander";
import got from "got";
import inquirer from "inquirer";
import { groupBy } from "lodash-es";
import { table, TableUserConfig } from "table";

interface Division {
  Title: string;
  DivisionId: number;
  AyeCount: number;
  NoCount: number;
  Date: string;
  Ayes: Member[];
  Noes: Member[];
}

interface Member {
  MemberId: number;
  Name: string;
  Party: string;
  SubParty: string;
  PartyColour: string;
  PartyAbbreviation: string;
  MemberFrom: string;
  ListAs: string;
  ProxyName: string;
}

program
  .command("divisions")
  .description("Displays a list of recent divisions")
  .action(async () => {
    const divisions = await getAllDivisions();

    const divisionsObj = divisions.map((division) => ({
      name: `[${division.Date}] ${division.Title}`,
      value: division.DivisionId,
    }));

    console.log(`      
  ____              _       
 |  _ \\ _   _  __ _(_)_ __  
 | |_) | | | |/ _\` | | '_ \\ 
 |  __/| |_| | (_| | | | | |
 |_|    \\__,_|\\__, |_|_| |_|
              |___/         

~~ The Parliamentary CLI ~~
    `);

    inquirer
      .prompt({
        type: "list",
        name: "Divisions",
        message: "Choose a division",
        choices: divisionsObj,
        loop: false,
      })
      .then(async (answers) => {
        const division = await getDivisionResult(answers.Divisions);
        const ayePartyGroups = groupBy(division.Ayes, "Party");
        const noePartyGroups = groupBy(division.Noes, "Party");

        console.log(`Results for the division "${division.Title}...`);
        console.log("------------------------------");
        console.log(
          `The division was held on ${formatISODateTime(division.Date)}`
        );
        console.log(`👍 Ayes: ${division.AyeCount}`);
        console.log(`👎 Noes: ${division.NoCount}`);
        console.log("------------------------------");
        console.log("Vote Breakdown:");

        let ayeTable = [];
        let noeTable = [];

        ayeTable.push(["Aye Votes", ""]);
        noeTable.push(["Noe Votes", ""]);

        for (const [party, value] of Object.entries(ayePartyGroups)) {
          ayeTable.push([party, value.length.toString()]);
        }

        for (const [party, value] of Object.entries(noePartyGroups)) {
          noeTable.push([party, value.length.toString()]);
        }

        console.log(
          table(ayeTable, {
            header: {
              alignment: "center",
              content: "👍 Ayes",
            },
          })
        );

        console.log(
          table(noeTable, {
            header: {
              alignment: "center",
              content: "👎 Noes",
            },
          })
        );
      });
  });

const getAllDivisions: () => Promise<Division[]> = async () => {
  const res = await got.get<Division[]>(
    "https://commonsvotes-api.parliament.uk/data/divisions.json/search",
    { responseType: "json" }
  );

  return res.body;
};

const getDivisionResult: (divisionId: number) => Promise<Division> = async (
  divisionId: number
) => {
  const res = await got.get<Division>(
    `https://commonsvotes-api.parliament.uk/data/division/${divisionId}.json`,
    { responseType: "json" }
  );

  return res.body;
};

const formatISODateTime: (dateString: string) => string = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
};

program.parse();
