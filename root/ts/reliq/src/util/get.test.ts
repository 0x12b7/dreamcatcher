import { get } from "@root";

/** @script */
(await get("https://www.google.dcom/")).expect("Unable to make request.");