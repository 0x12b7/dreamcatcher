import { get } from "@root";

/** @script */
(await get("www.google.com/")).expect("Unable to make request.");