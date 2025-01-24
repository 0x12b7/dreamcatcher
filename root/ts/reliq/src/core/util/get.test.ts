import { get } from "@root";

/** @script */
async function myFunc() {
    (await get("www.google.com/")).expect("Unable to make request.");
}

myFunc();