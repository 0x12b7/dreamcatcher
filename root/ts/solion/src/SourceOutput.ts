export type SourceOutput = {
    id: number;
    ast: object;
    legacyAST?: object;
};
export function SourceOutput($: SourceOutput): SourceOutput {
    /***/ {
        return $;
    }
}