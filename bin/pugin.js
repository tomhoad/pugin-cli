#! /usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { program } from "commander";
import inquirer from "inquirer";
import { table } from "table";
import { summaryTableConfig, resultsTableConfig } from "./tables.js";
import { getDivisionResult, getAllDivisions } from "./api.js";
import { groupVotesByParty, formatISODateTime } from "./utils.js";
program
    .command("divisions")
    .description("Displays a list of recent divisions")
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    const divisions = yield getAllDivisions();
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
        .then((answers) => __awaiter(void 0, void 0, void 0, function* () {
        const division = yield getDivisionResult(answers.Divisions);
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
    }));
}));
program.parse();
