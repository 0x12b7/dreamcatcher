import { get } from "@root";

/** @script */
(await get("https://www.google.cjom/")).expect("Unable to make request.");