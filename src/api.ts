import got from "got";
import { Division } from "./interfaces.js";

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

export { getAllDivisions, getDivisionResult };
