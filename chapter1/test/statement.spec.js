const assert = require("assert");
const invoicesData = require("./data/invoices.json");
const playsData = require("./data/plays.json");
const {htmlStatement, statement} = require("../main/statement.js");

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
        try {
            statement(invoicesData[1], playsData)
            assert.fail()
        } catch (err) {
            assert.strictEqual(err.message, '알 수 없는 장르 : horor')
        }
    });

    it("BigCo의 청구서는 정상적으로 청구내용이 발행된다 (HTML 렌더링 버전)", () => {
        const expected = `<h1>청구 내역 (고객명 : BigCo)</h1>
<table>
<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>
 <tr><td>hamlet</td><td>(55석)</td><td>$650.00</td></tr>
 <tr><td>As You Like It</td><td>(35석)</td><td>$580.00</td></tr>
 <tr><td>Othello</td><td>(40석)</td><td>$500.00</td></tr>
</table>
<p>총액: <em>$1,730.00</em></p>
<p>적립 포인트: <em>47</em>점</p>
`;

        assert.strictEqual(expected, htmlStatement(invoicesData[0], playsData));
    });
});
