const assert = require("assert");
const invoicesData = require("../main/data/invoices.json");
const playsData = require("../main/data/plays.json");
const statement = require("../main/statement.js");

describe("statement.js test", () => {
  it("영수증 출력", () => {
    const expected = `청구내역 (고객명: BigCo)
hamlet : $650.00 (55석)
As You Like It : $580.00 (35석)
Othello : $500.00 (40석)
총액: $1,730.00
적립 포인트: 47점
`;

    assert.strictEqual(expected, statement(invoicesData[0], playsData));
  });
});
