export type SourceLocation = {
    file: string;
    start: number;
    end: number;
};
export function SourceLocation($: SourceLocation): SourceLocation {
    /***/ {
        return $;
    }
}