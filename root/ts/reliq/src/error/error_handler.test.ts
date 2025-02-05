import { Option } from "@root";
import { Some } from "@root";
import { None } from "@root";

(() => {
    let option0: Option<0n> = None;
    let option1: Option<1n> = None;
    let option2: Option<2n> = Some<2n>(2n);
    Option.Handler.any(option0, option1, option2).expect("[error_handler.test]: Failed to retrieve an expected value.");
    return;
})();

(() => {
    let option0: Option<0n> = None;
    let option1: Option<1n> = None;
    let option2: Option<2n> = Some<2n>(2n);
    Option.Handler.all(option0, option1, option2).expect("[error_handler.test]: Failed to retrieve an expected value.");
    return;
})();

