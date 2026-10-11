/** Returns a random element of a non-empty array. */
export function getRandomItem<T>(items: readonly T[]): T {
    if (items.length === 0) {
        throw new Error('getRandomItem needs a non-empty array');
    }
    return items[Math.floor(Math.random() * items.length)];
}
