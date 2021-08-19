"user-strict";
/**
 * Разбиение числа на слагаемые.
 *
 * 2 = 1+1
 * 2 = 2
 */

console.time("rec");
// Рекурсия
(function (n) {
    function out(index) {
        console.log(a.slice(0, index).join("+"));
        totalNumberOfSequences += 1;
    }

    /**
     * Рекурсивная функция перебора слагаемых числа.
     * @param {number} index индекс в vector последовательности.
     * @param {number} sum сумма числа.
     * @param {number} last последнее число.
     */
    function rec(index, sum, last) {
        if (sum === n) {
            out(index);
            return;
        }
        for (let i = last; i <= n - sum; i += 1) {
            a[index] = i;
            rec(index + 1, sum + i, i);
        }
    }

    // Число последовательностей.
    let totalNumberOfSequences = 0;

    // Вектор последовательности.
    const a = [];
    rec(0, 0, 1);
    console.log("totalNumberOfSequences > ", totalNumberOfSequences);
    return totalNumberOfSequences;
})(20);
console.timeEnd("rec");

console.time("iter");
// Итеративный
(function (n) {
    let a = new Array(n).fill(1);
    let totalNumberOfSequences = 1;

    while (a.length > 1) {
        let sum = a.pop(); // a.length = 4
        let i = a.length - 1; // i = 3 1,1,1,1
        while (i > 0 && a[i - 1] === a[i]) {
            sum += a.pop();
            i -= 1;
        }
        a[i] += 1;
        sum -= 1;
        a = a.concat(new Array(sum).fill(1));
        totalNumberOfSequences += 1;
    }
    console.log(totalNumberOfSequences);
})(20);
console.timeEnd("iter");

/**
 * Найти количество всех возможных разбиений на слагаемые можно по формуле Эйлера
 * из рекурентного соотношения P(n,k) = P(n-1, k-1) + P(n-k,k)
 * при P(n,n) = 1, P(n,0) = 0, P(n,k) = 0 при k > n
 * 
 * Вариант без кеширования.
 */
console.time("totalNumberOfSequences");
(function (n) {
    function p(n, k) {
        if (k > n || k === 0) return 0;
        if (k === n) return 1;

        return p(n - 1, k - 1) + p(n - k, k);
    }

    let totalNumberOfSequences = 1;

    for (let i = 1; i < n; i += 1) totalNumberOfSequences += p(n, i);
    console.log(totalNumberOfSequences);
    return totalNumberOfSequences;
})(100);
console.timeEnd("totalNumberOfSequences");

// Вариант с кешированием.
console.time("totalNumberOfSequences");
(function (n) {
    const memoize = (fn) => {
        const cache = {};
        return (...args) => {
            const key = `${args[0]},${args[1]}`;
            if (key in cache) {
                return cache[key];
            } else {
                return (cache[key] = fn(...args));
            }
        };
    };

    const memoP = memoize((n,k) => {
        if (k > n || k === 0) return 0;
        if (k === n) return 1;

        return memoP(n - 1, k - 1) + memoP(n - k, k);
    });

    let totalNumberOfSequences = 1;

    for (let i = 1; i < n; i += 1) totalNumberOfSequences += memoP(n, i);
    console.log(totalNumberOfSequences);
    return totalNumberOfSequences;
})(100);
console.timeEnd("totalNumberOfSequences");