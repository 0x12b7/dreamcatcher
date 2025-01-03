export type Bytecode = {
    object?: string;
    opcodes?: string;
    sourceMap?: string;
    linkReferences?: {
        [fileName: string]: {
            [library: string]: Array<{
                start: number;
                length: number;
            }>;
        };
    };
};

export function Bytecode(_instance: Bytecode): Bytecode {
    /***/ {
        return _instance;
    }
}