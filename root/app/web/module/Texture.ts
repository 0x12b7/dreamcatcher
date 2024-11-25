

export function stripe(
    color0: string,
    color1: string,
    width: number = 10,
    gap: number = 10,
    angle: number = 45,
    position: string = "0 0"): string {
    return `repeating-linear-gradient(${angle}deg, ${color0}, ${color0} ${width}px, ${color1} ${width}px, ${color1} ${width + gap}px), ${position}`;
}