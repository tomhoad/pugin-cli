#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
commander_1.program.command("divisions").description("Displays a list of recent divisions");
commander_1.program.parse();
console.log("Here is a list of divisions");
