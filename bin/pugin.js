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
import got from "got";
import inquirer from "inquirer";
import { groupBy } from "lodash-es";
import { table } from "table";
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
        const ayePartyGroups = groupBy(division.Ayes, "Party");
        const noePartyGroups = groupBy(division.Noes, "Party");
        console.log(`Results for the division "${division.Title}...`);
        console.log("------------------------------");
        console.log(`The division was held on ${formatISODateTime(division.Date)}`);
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
        console.log(table(ayeTable, {
            header: {
                alignment: "center",
                content: "👍 Ayes",
            },
        }));
        console.log(table(noeTable, {
            header: {
                alignment: "center",
                content: "👎 Noes",
            },
        }));
    }));
}));
const getAllDivisions = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield got.get("https://commonsvotes-api.parliament.uk/data/divisions.json/search", { responseType: "json" });
    return res.body;
});
const getDivisionResult = (divisionId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield got.get(`https://commonsvotes-api.parliament.uk/data/division/${divisionId}.json`, { responseType: "json" });
    return res.body;
});
const formatISODateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
};
program.parse();
