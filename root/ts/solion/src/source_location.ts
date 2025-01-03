export type SourceLocation = {
    file: string;
    start: number;
    end: number;
};

export function SourceLocation(_instance: SourceLocation): SourceLocation {
    /** @constructor */ {
        return _instance;
    }
}