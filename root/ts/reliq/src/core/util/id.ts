export type Identifier = {
    next(): bigint;
};

export const Identifier: Identifier = (() => {
    let _n: bigint;

    /** @constructor */ {
        _n = 0n;
        return { next };
    }

    function next(): bigint {
        return _n += 1n;
    }
})();



