function promisesWithRejectionLimit(promisesPool, limit) {
    let rejectedCount = 0;
    return Promise.allSettled(promisesPool).then((results) => {
        for (const result of results) {
            if (result.status === "rejected") {
                rejectedCount++;
                if (rejectedCount > limit) {
                    throw new Error(`Maximum number of ${limit} rejections exceeded`);
                    return Promise.reject();
                }
            }
        }
        return Promise.resolve();
    });
}
module.exports = promisesWithRejectionLimit;