import { Member } from "./interfaces.js";
import { groupBy } from "lodash-es";

const formatISODateTime: (dateString: string) => string = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB");
};

const groupVotesByParty = (memberVoteList: Member[]) => {
  return groupBy(memberVoteList, "Party");
};

export { formatISODateTime, groupVotesByParty };
