import { program } from "commander";
import inquirer from "inquirer";
import { table } from "table";
import { summaryTableConfig, resultsTableConfig } from "./tables.js";
import { getDivisionResult, getAllDivisions } from "./api.js";
import { groupVotesByParty, formatISODateTime } from "./utils.js";

function init() {
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

~~ The Parliamentary CLI v0.1.0 ~~
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
          const ayePartyGroups = groupVotesByParty(division.Ayes);
          const noePartyGroups = groupVotesByParty(division.Noes);

          let ayeTable = [];
          let noeTable = [];

          const summaryTable = [
            [division.Title.toUpperCase(), ""],
            [`Held on ${formatISODateTime(division.Date)}`, ""],
            ["👍 Ayes", division.AyeCount],
            ["👎 Noes", division.NoCount],
          ];

          ayeTable.push(["👍 Aye Votes 👍", ""]);
          noeTable.push(["👎 Noe Votes 👎", ""]);

          for (const [party, value] of Object.entries(ayePartyGroups)) {
            ayeTable.push([party, value.length.toString()]);
          }

          for (const [party, value] of Object.entries(noePartyGroups)) {
            noeTable.push([party, value.length.toString()]);
          }

          console.log(table(summaryTable, summaryTableConfig));
          console.log(table(ayeTable, resultsTableConfig));
          console.log(table(noeTable, resultsTableConfig));
        });
    });

  program.parse();
}

export { init };
