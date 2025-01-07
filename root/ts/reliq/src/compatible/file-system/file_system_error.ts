import type { FileSystemErrorCode } from "@root";
import { Option } from "@root";

export type FileSystemError = {
    code: FileSystemErrorCode;
    message: string;
    path: Option<string>;
    errno: Option<number>;
    syscall: Option<string>;
};