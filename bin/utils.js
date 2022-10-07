import { groupBy } from "lodash-es";
const formatISODateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
};
const groupVotesByParty = (memberVoteList) => {
    return groupBy(memberVoteList, "Party");
};
export { formatISODateTime, groupVotesByParty };
