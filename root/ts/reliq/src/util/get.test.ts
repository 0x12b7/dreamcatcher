import { get } from "@root";

/** @script */
(await get("https://www.google.com/")).expect("Unable to make request.");