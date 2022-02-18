const assert = require("assert");
const invoicesData = require("./data/invoices.json");
const playsData = require("./data/plays.json");
const statement = require("../main/statement.js");

describe("statement.js test", () => {
  it("BigCo의 청구서는 정상적으로 청구내용이 발행된다", () => {
    const expected = `청구내역 (고객명: BigCo)
hamlet : $650.00 (55석)
As You Like It : $580.00 (35석)
Othello : $500.00 (40석)
총액: $1,730.00
적립 포인트: 47점
`;

    assert.strictEqual(expected, statement(invoicesData[0], playsData));
  });

    it("Taehun의 청구서는 지원하지 않는 play.type을 가지고 있어 청구내용 발행이 실패한다", () => {
        assert.throws(() => statement(invoicesData[1], playsData), Error);
    });
});
