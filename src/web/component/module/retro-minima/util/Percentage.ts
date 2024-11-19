import * as ColorPalette from "@style/ColorPalette";

export function symbol(percentage: number): string {
    /**
     * moonshot
     * breakout
     * surge
     * rally
     * crab
     * dip
     * pullback
     * correction
     * crash
     * dead
     */
    return (
        percentage >= 20 ? "⥉" :
        percentage >= 10 ? "⇞" :
        percentage >= 5 ? "⤉" :
        percentage >= 1 ? "⇡" :
        percentage > -1 && percentage < 1 ? "⇢" :
        percentage <= -99 ? "🕱" :
        percentage <= -50 ? "⭍" :
        percentage <= -20 ? "⭽" :
        percentage <= -5 ? "⤈" :
        percentage <= -1 ? "⇣" :
        ""
    );
}

export function color(percentage: number): string {
    return percentage > 0 ? ColorPalette.SPRING_GREEN : percentage < 0 ? ColorPalette.BITTER_SWEET : ColorPalette.TIMPERWOLD;
}