const _BASE = 5 as const;
const _GOLDEN_RATIO = 1.618 as const;

export function rho(count: bigint) {
    return _BASE * (_GOLDEN_RATIO * Number(count));
}