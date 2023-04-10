const promisesWithRejectionLimit = require('./promisesWithRejectionLimit')
test('should resolve when the number of rejected promises is below the limit', async () => {
    const promises = [
        Promise.resolve(),
        Promise.reject(),
        Promise.reject(),
    ];
    const result = await promisesWithRejectionLimit(promises, 2);
    expect(result).toBeUndefined();
});

test('should reject when the number of rejected promises is above the limit', async () => {
    const promises = [
        Promise.resolve(),
        Promise.reject(),
        Promise.reject(),
        Promise.reject(),
    ];
    try {
        await promisesWithRejectionLimit(promises, 2);
        // should not get here
        expect(true).toBe(false);
    } catch (error) {
        expect(error.message).toBe("Maximum number of 2 rejections exceeded");
    }
});

test("should resolve when the promises pool is empty", () => {
    const promises = [];
    return promisesWithRejectionLimit(promises, 1).then((result) => {
        expect(result).toBeUndefined();
    });
});
test("should resolve when there are no rejected promises", () => {
    const promises = [Promise.resolve("String 1"), Promise.resolve("String 2")];
    return promisesWithRejectionLimit(promises, 1).then((result) => {
        expect(result).toBeUndefined();
    });
});