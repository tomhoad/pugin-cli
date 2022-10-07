#! /usr/bin/env node

import { program } from "commander";

program.command("divisions").description("Displays a list of recent divisions");

program.parse();

console.log("Here is a list of divisions");
