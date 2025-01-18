/// node:fs

export type FileSystemErrorCode =
    | "ENOENT"
    | "EISDIR"
    | "ENOTDIR"
    | "EEXIST"
    | "EPERM"
    | "EACCES"
    | "EMFILE"
    | "ENFILE"
    | "EBADF"
    | "EROFS";