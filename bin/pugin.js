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
program
    .command("divisions")
    .description("Displays a list of recent divisions")
    .action(() => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield got.get("https://commonsvotes-api.parliament.uk/data/divisions.json/search", { responseType: "json" });
    const divisions = res.body;
    for (const division of divisions) {
        console.log(division.Title);
    }
}));
program.parse();
