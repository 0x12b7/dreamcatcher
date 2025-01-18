export type NetworkError = {
    code?: string;
    syscall?: string;
    address?: string;
    port?: number;
    errno?: number;
    host?: string;
    path?: string;
};