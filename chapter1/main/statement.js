const createStatementData = require("./createStatementData");
const invoicesData = require("./data/invoices.json");
const playsData = require("./data/plays.json");

function usd(aNumber) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}

function renderPlainText(data, plays) {
  let result = `청구내역 (고객명: ${data.customer})\n`;
  for (let perf of data.performances) {
    // 청구 내역을 출력한다.
    result += `${perf.play.name} : ${usd(perf.amount)} (${perf.audience}석)\n`;
  }
  result += `총액: ${usd(data.totalAmount)}\n`;
  result += `적립 포인트: ${(data.totalVolumeCredits)}점\n`;

  return result;
}

function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

console.log(statement(invoicesData[0], playsData));

module.exports = statement;
