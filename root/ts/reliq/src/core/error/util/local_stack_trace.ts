import type { Option } from "@root";
import { Some } from "@root";
import { None } from "@root";

/**
 * ***Brief***
 * Captures and returns the stack trace at the provided function's location.
 */
export function localStackTrace(location: Function): Option<string> {
    let e: Error = Error();
    Error.captureStackTrace(e, location);
    if (e.stack) return Some(e.stack);
    return None;
}