function createPerformanceCalculator(aPerformance, aPlay) {
    switch (aPlay.type) {
        case "tragedy": return new TragedyCalculator(aPerformance, aPlay);
        case "comedy": return new ComedyCalculator(aPerformance, aPlay);
        default:
            throw new Error(`알 수 없는 장르 : ${aPlay.type}`);
    }
}

class PerformanceCalculator {
    constructor(aPerformance, aPlay) {
        this.performance = aPerformance
        this.play = aPlay
    }

    get amount() {
        throw new Error('서브클래스에서 처리하도록 설계되었습니다.');
    }

    get volumeCredits() {
        let result = 0;
        result += Math.max(this.performance.audience - 30, 0);
        if ("comedy" === this.play.type) {
            result += Math.floor(this.performance.audience / 5);
        }
        return result;
    }
}

class TragedyCalculator extends PerformanceCalculator {
    get amount() {
        let result = 40000;

        if (this.performance.audience > 30) {
            result += 1000 * (this.performance.audience - 30);
        }

        return result;
    }
}

class ComedyCalculator extends PerformanceCalculator {
    get amount() {
        let result = 30000;

        if (this.performance.audience > 20) {
            result += 10000 + 500 * (this.performance.audience - 20);
        }
        result += 300 * this.performance.audience;

        return result;
    }
}

function createStatementData(invoice, plays) {
    const statementData = {};
    statementData.customer = invoice.customer;
    statementData.performances = invoice.performances.map(enrichPerformance);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalVolumeCredits = totalVolumeCredits(statementData);
    return statementData;

    function enrichPerformance(aPerformance) {
        const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance));
        const result = Object.assign({}, aPerformance);
        result.play = calculator.play;
        result.amount = calculator.amount;
        result.volumeCredits = calculator.volumeCredits;
        return result;
    }

    function playFor(aPerformance) {
        return plays[aPerformance.playID]
    }

    function amountFor(aPerformance) {
        return new PerformanceCalculator(aPerformance, playFor(aPerformance)).amount
    }

    function volumeCreditsFor(perf) {
        return new PerformanceCalculator(perf, playFor(perf)).volumeCredits
    }

    function totalAmount(data) {
        return data.performances
            .reduce((total, p) => total + p.amount, 0);
    }

    function totalVolumeCredits(data) {
        return data.performances
            .reduce((total, p) => total + p.volumeCredits, 0);
    }
}

module.exports = createStatementData;