export type RetroMinimaChartPoint = {
    timestamp: bigint;
    open: number;
    close: number;
    wickLow: number;
    wickHigh: number;
};

export const RetroMinimaChartPoint = (point: RetroMinimaChartPoint) => point;