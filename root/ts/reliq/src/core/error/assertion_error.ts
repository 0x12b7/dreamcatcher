import type { Error } from "@root";

/**
 * 
 * Typically found when .expect is called on an Option or Result. Unlike
 * other errors these are not meant to be caught. It means something
 * has gone wrong fundamenttaly in the program and it cannot be recovered
 * either reboot the program or debug your code.
 */
export type AssertionError = Error<"ERR_INVALID_ASSERTION">;