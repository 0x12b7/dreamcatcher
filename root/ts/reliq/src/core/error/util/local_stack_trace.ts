import type { Option } from "@root";
import { Some } from "@root";
import { None } from "@root";

export function localStackTrace(location: Function): Option<string> {
    let e: Error = Error();
    Error.captureStackTrace(e, location);
    if (e.stack) return Some(e.stack);
    return None;
}