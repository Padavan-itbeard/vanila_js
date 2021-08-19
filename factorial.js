'use-strict'

/**
 * Функция добавляет cache для запоминания ранее вычисленных значений.
 * @param {function} fn Оборачиваяемая функция
 * @returns мемоизированную функцию
 */
const memoize = (fn) => {
    const cache = {};
    return (...args) => {
        const key = args.reduce((key, arg) => key += String(arg), '');

        return (key in cache) ? cache[key] : (cache[key] = fn(...args));
    }
}

const factorial = memoize((n) => {
    if (n === 1) return 1;
    else return n * factorial(n - 1);
});

console.time('1');
console.log(factorial(10));
console.timeEnd('1');
console.time('2');
console.log(factorial(11));
console.timeEnd('2');