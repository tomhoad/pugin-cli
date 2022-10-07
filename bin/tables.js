export const summaryTableConfig = {
    columns: [
        { alignment: "left", width: 40, wrapWord: true },
        { alignment: "right", width: 10 },
    ],
    spanningCells: [
        { col: 0, row: 0, colSpan: 2, alignment: "center" },
        { col: 0, row: 1, colSpan: 2, alignment: "center" },
    ],
};
export const resultsTableConfig = {
    columns: [
        { alignment: "left", width: 40 },
        { alignment: "right", width: 10 },
    ],
    spanningCells: [{ col: 0, row: 0, colSpan: 2, alignment: "center" }],
};
