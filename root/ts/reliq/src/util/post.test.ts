import { post } from "@root";

/** @script */
(await post("https://www.google.com/")).expectErr("Unable to make request.")