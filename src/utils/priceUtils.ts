/**
 * Converts price text such as "$29.99", "Tax: $2.40" or "Item total: $1,129.99"
 * into a number.
 *
 * @throws Error if the text contains no valid number (fails fast instead of returning NaN).
 */
export function parsePrice(text: string): number {
    const cleaned = text.replace(/,/g, '');
    const match = cleaned.match(/\d+(\.\d+)?/);

    if (!match) {
        throw new Error(`Cannot parse a price from text: "${text}"`);
    }

    return parseFloat(match[0]);
}

/**
 * Rounds to 2 decimals. Use it when comparing calculated money values,
 * because 0.1 + 0.2 !== 0.3 in floating point arithmetic.
 */
export function roundToTwoDecimals(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
}
