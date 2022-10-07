var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import got from "got";
const getAllDivisions = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield got.get("https://commonsvotes-api.parliament.uk/data/divisions.json/search", { responseType: "json" });
    return res.body;
});
const getDivisionResult = (divisionId) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield got.get(`https://commonsvotes-api.parliament.uk/data/division/${divisionId}.json`, { responseType: "json" });
    return res.body;
});
export { getAllDivisions, getDivisionResult };
