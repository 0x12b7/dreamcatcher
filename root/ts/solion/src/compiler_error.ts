export type CompilerError =
    | "JSONError"
    | "IOError"
    | "ParserError"
    | "DocstringParsingError"
    | "SyntaxError"
    | "DeclarationError"
    | "TypeError"
    | "UnimplementedFeatureError"
    | "InternalCompilerError"
    | "Exception"
    | "CompilerError"
    | "FatalError"
    | "Warning";