export type SourceOutput = {
    id: number;
    ast: object;
    legacyAST?: object;
};

export function SourceOutput(_instance: SourceOutput): SourceOutput {
    /** @constructor */ {
        return _instance;
    }
}